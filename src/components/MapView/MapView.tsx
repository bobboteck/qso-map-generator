import * as React from 'react';
import { IMapViewProps } from './IMapViewProps';
import { IMapViewState } from './IMapViewState';
import { Button, Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import L, { Icon, IconOptions, LatLng, LeafletEvent, Map } from 'leaflet';
import { MapConsumer, MapContainer, MapContainerProps, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { IMapConfig } from '../../entities/IMapConfig';
import { QthMarker } from '../QthMarker/QthMarker';

const mapTiles = "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png";
const mapAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const minLatitude: number = -90;
const maxLatitude: number = 90;

const minLongitude: number = -180;
const maxLongitude: number = 180;

const minZoom: number = 2;
const maxZoom: number = 16;
const startZoom: number = 8;

export class MapView extends React.Component<IMapViewProps, IMapViewState>
{
    constructor(props: IMapViewProps)
    {
        super(props);

        // Bind of this to use it, otherwise is undefined
        this._onWhenCreated = this._onWhenCreated.bind(this);

        this.state = 
        {
            Latitude: 0,
            Longitude: 0,
            ZoomLevel: 5,
            objMap: undefined
        };
    }

    componentDidMount()
    {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(this.GetPosition);
        }
        else
        {
            console.log("Geolocation is not supported");
        }
    }

    public render(): React.ReactElement<IMapViewProps>
    {
        const { Latitude, Longitude, ZoomLevel } = this.state;

        return(
            <Form>
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel controlId="latitudeMapForm" label="Latitude">
                            <Form.Control type="number" value={Latitude} required min={minLatitude} max={maxLatitude} onChange={this._onChangeLatitude} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="longitudeMapForm" label="Longitude">
                            <Form.Control type="number" value={Longitude} required min={minLongitude} max={maxLongitude} onChange={this._onChangeLongitude} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="zoomMapForm" label="Zoom level">
                            <Form.Control type="number" value={ZoomLevel} required min={minZoom} max={maxZoom} onChange={this._onChangeZoomLevel} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <Button variant="primary" type="button" className="centerButton" onClick={this._onCurrentCenterClick}>Use current center</Button>
                    </Col>
                </Row>
                <Row>
                    <div className='mapSize'>
                        <MapContainer center={[Latitude, Longitude]} zoom={ZoomLevel} whenCreated={this._onWhenCreated} maxZoom={maxZoom} minZoom={minZoom}>
                            <TileLayer attribution={mapAttr} url={mapTiles} />
                            <QthMarker Data={this.props.QsoMapData?.QTH} />
{
    this.props.QsoMapData &&
    (
        [...this.props.QsoMapData.QSOs].map((q, i) =>
                            <Marker position={[q.Latitude, q.Longitude]}>
                                <Popup>
                                    {q.CallSign}
                                </Popup>
                            </Marker>
        )
    )
}
                        </MapContainer>
                    </div>
                </Row>
            </Form>
        );
    }


    /**
     * Change Latitude in the map, and check if value fault in the expetted range
     * @param e Event on the element
     */
    private _onChangeLatitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        const { objMap, Longitude, ZoomLevel } = this.state;

        let newLatitude: number = e.target.value ? Number(e.target.value) : 0;

        // Check if new value falt in expected range
        if(newLatitude < minLatitude)
        {
            newLatitude = minLatitude;
        }
        else if(newLatitude > maxLatitude)
        {
            newLatitude = maxLatitude;
        }

        // Set new Latitude in the State
        this.setState({ Latitude: newLatitude });
        // Move the map in the new Latitude
        objMap?.flyTo([newLatitude, Longitude]);

        // Update OnChange
        let configuration: IMapConfig = { Latitude: newLatitude, Longitude: Longitude, Zoom: ZoomLevel };
        this.props.onChange(configuration);
    }

    /**
     * Change Longitude in the map, and check if value fault in the expetted range
     * @param e Event on the element
     */
    private _onChangeLongitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        const { objMap, Latitude, ZoomLevel } = this.state;

        let newLongitude: number = e.target.value ? Number(e.target.value) : 0;

        // Check if new value falt in expected range
        if(newLongitude < minLongitude)
        {
            newLongitude = minLongitude;
        }
        else if(newLongitude > maxLongitude)
        {
            newLongitude = maxLongitude;
        }

        // Set the new Longitude in the State
        this.setState({ Longitude: e.target.value ? Number(e.target.value) : 0 });
        // Move the map in the new Longitude
        objMap?.flyTo([Latitude, newLongitude]);

        // Update OnChange
        let configuration: IMapConfig = { Latitude: Latitude, Longitude: newLongitude, Zoom: ZoomLevel };
        this.props.onChange(configuration);
    }

    /**
     * Change zoon in the map, and check if value fault in the expetted range
     * @param e Event on the element
     */
    private _onChangeZoomLevel = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        const { Latitude, Longitude } = this.state;
        let newZoom: number = e.target.value ? Number(e.target.value) : minZoom;

        // Check if new value falt in expected range
        if(newZoom < minZoom)
        {
            newZoom = minZoom;
        }
        else if(newZoom > maxZoom)
        {
            newZoom = maxZoom;
        }

        // Set new zoom in the state
        this.setState({ ZoomLevel: newZoom });
        // Set new zoom in Map
        (this.state.objMap as Map).setZoom(newZoom);

        // Update OnChange
        let configuration: IMapConfig = { Latitude: Latitude, Longitude: Longitude, Zoom: newZoom };
        this.props.onChange(configuration);
    }

    /**
     * Set the Map object in to the State
     * @param map Leaflet Map object
     */
    private _onWhenCreated(map: Map)
    {
        // Set the Map object in the State
        this.setState({objMap: map});
    }

    /**
     * Save in the State variables the current view (Location and Zoom) in the Map
     * @param event Event on the element
     */
    private _onCurrentCenterClick = (event: any): void =>
    {
        let center: LatLng = (this.state.objMap as Map).getCenter();
        let zoom: number = (this.state.objMap as Map).getZoom();

        this.setState({ Latitude: center.lat, Longitude: center.lng, ZoomLevel: zoom });

        // Update OnChange
        let configuration: IMapConfig = { Latitude: center.lat, Longitude: center.lng, Zoom: zoom };
        this.props.onChange(configuration);
    }


    /**
     * Callback function for the geolocation method to get device position
     * @param position The position of device
     */
    private GetPosition = (position: GeolocationPosition): void =>
    {
        const { objMap } = this.state;
        // Set the position returned
        this.setState({ Latitude: position.coords.latitude, Longitude: position.coords.longitude, ZoomLevel: startZoom });
        // Move Map at current position
        (this.state.objMap as Map).flyTo([position.coords.latitude, position.coords.longitude], startZoom);

        // Update OnChange
        let configuration: IMapConfig = { Latitude: position.coords.latitude, Longitude: position.coords.longitude, Zoom: startZoom };
        this.props.onChange(configuration);
    }
}