import * as React from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { MapConsumer, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { IMapViewProps } from './IMapViewProps';
import { IMapViewState } from './IMapViewState';

const mapTiles = "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png";
const mapAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export class MapView extends React.Component<IMapViewProps, IMapViewState>
{
    constructor(props: IMapViewProps)
    {
        super(props);

        this.state = 
        {
            Latitude: 0,
            Longitude: 0,
            ZoomLevel: 2
        };

/*
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(this.GetPosition);
        }
        else
        {
            console.log("Geolocation is not supported");
        }
*/
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

/*
        //ref={(m: any) => { this.Leaflet = m; }}
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.on('zoomend', () => {
            window.console.log('Current zoom level -> ', leafletMap.getZoom());
        });
*/
    }

    public render(): React.ReactElement<IMapViewProps>
    {
        const { Latitude, Longitude, ZoomLevel } = this.state;

        return(
            <Form>
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel controlId="latitudeMapForm" label="Latitude">
                            <Form.Control type="number" value={Latitude} required min="-90" max="90" onChange={this._onChangeLatitude} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="longitudeMapForm" label="Longitude">
                            <Form.Control type="number" value={Longitude} required min="-180" max="180" onChange={this._onChangeLongitude} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="zoomMapForm" label="Zoom level">
                            <Form.Control type="number" value={ZoomLevel} required min="0" max="20" onChange={this._onChangeZoomLevel} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <div className='mapSize'>

                        <MapContainer center={[Latitude, Longitude]} zoom={ZoomLevel} >
                            <TileLayer attribution={mapAttr} url={mapTiles} />
                            <MapConsumer>
                                {(map) =>
                                    {
                                        map.addEventListener('zoomend', () => {
                                            window.console.log('Current zoom level -> ', map.getZoom());
                                        });
                                        console.log('Map center: ', map.getCenter());
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

    private _onChangeLatitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ Latitude: e.target.value ? Number(e.target.value) : 0 });

        //this.props.Latitude(e.target.value);
    }

    private _onChangeLongitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ Longitude: e.target.value ? Number(e.target.value) : 0 });
    }

    private _onChangeZoomLevel = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ ZoomLevel: e.target.value ? Number(e.target.value) : 0 });
    }


    private GetPosition = (position: GeolocationPosition): void =>
    {
        this.setState({ Latitude: position.coords.latitude, Longitude: position.coords.longitude });
    }
}