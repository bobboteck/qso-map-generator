import * as React from 'react';
import { IMapViewProps } from './IMapViewProps';
import { IMapViewState } from './IMapViewState';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { LatLng, LeafletEvent, Map } from 'leaflet';
import { MapConsumer, MapContainer, MapContainerProps, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

const mapTiles = "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png";
const mapAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const minLatitude: number = -90;
const maxLatitude: number = 90;

const minLongitude: number = -180;
const maxLongitude: number = 180;

const minZoom: number = 2;
const maxZoom: number = 16;

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

                        <MapContainer center={[Latitude, Longitude]} zoom={ZoomLevel} whenCreated={this._onWhenCreated}>
                            <TileLayer attribution={mapAttr} url={mapTiles} />
                            <MapConsumer>
                                {(map) =>
                                    {
/*
                                        map.addEventListener('zoomend', () => 
                                        {
                                            let currentZoom: number = map.getZoom();

                                            if(ZoomLevel !== currentZoom)
                                            {
                                                //window.console.log('Current zoom level -> ', currentZoom);
                                                this.setState({ ZoomLevel: currentZoom});
                                            }
                                        });
*/
/*
                                        map.addEventListener("dragend", () =>
                                        {
                                            //map.getCenter().lat
                                            this.setState({ Latitude: map.getCenter().lat, Longitude: map.getCenter().lng});
                                        });
*/
                                        //console.log('Map center: ', map.getCenter());
                                        return null;
                                    }
                                }
                            </MapConsumer>
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
        const { objMap, Longitude } = this.state;

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
    }

    /**
     * Change Longitude in the map, and check if value fault in the expetted range
     * @param e Event on the element
     */
    private _onChangeLongitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        const { objMap, Latitude } = this.state;

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
    }

    /**
     * Change zoon in the map, and check if value fault in the expetted range
     * @param e Event on the element
     */
    private _onChangeZoomLevel = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
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


    private _onCurrentCenterClick = (event: any): void =>
    {
        //TODO: 
    }


    private GetPosition = (position: GeolocationPosition): void =>
    {
        const { objMap } = this.state;

        //console.log("I am here!");

        this.setState({ Latitude: position.coords.latitude, Longitude: position.coords.longitude, ZoomLevel: 8 });

        console.log("POSITION: ", position);
        console.log("GET POSITION - STATE: ", this.state);
        console.log("LocalMAP: ", this.state.objMap);

        (this.state.objMap as Map).flyTo([position.coords.latitude, position.coords.longitude], 8);
    }
}