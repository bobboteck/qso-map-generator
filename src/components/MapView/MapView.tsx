import { LeafletElement } from '@react-leaflet/core';
import { LatLng, Map } from 'leaflet';
import * as React from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { MapConsumer, MapContainer, MapContainerProps, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { IMapViewProps } from './IMapViewProps';
import { IMapViewState } from './IMapViewState';

const mapTiles = "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png";
const mapAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//const mapRef = React.useRef();
//const mapRef = React.useRef<LeafletElement<Map>>();

export class MapView extends React.Component<IMapViewProps, IMapViewState>
{
    public mapRef: any;
    private myMap: string;

    constructor(props: IMapViewProps)
    {
        super(props);

        //this.mapRef = React.createRef();
        this.myMap = "";

        this.handleOnSetView = this.handleOnSetView.bind(this);


        this.state = 
        {
            Latitude: 0,
            Longitude: 0,
            ZoomLevel: 5,
            localMap: null,
            mapContainer: null
        };

        console.log("Costructor");
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
        //Dovrebbe essere buono
        //let myMap = (this.mapRef.current as LeafletElement<Map, LatLng>).instance;
        //myMap.flyTo([ this.state.Latitude, this.state.Longitude], 8);
        
        console.log("Map ref", this.mapRef);

        console.log("componentDidMount");

        //let myMap = (this.state.localMap as LeafletElement<Map, LatLng>).instance;
        //myMap.flyTo([ this.state.Latitude, this.state.Longitude], 8);
    }

    public render(): React.ReactElement<IMapViewProps>
    {
        //const mapRef = React.useRef();
        const { Latitude, Longitude, ZoomLevel, localMap } = this.state;

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

                        <MapContainer center={[Latitude, Longitude]} zoom={ZoomLevel} ref={this.mapRef} whenCreated={this.handleOnSetView}>
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

    private _onChangeLatitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ Latitude: e.target.value ? Number(e.target.value) : 0 });

        //this.props.Latitude(e.target.value);
        //const mapp = useMap();

        console.log("Latitude: ", e.target.value);
        //mapp.flyTo()
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


    private handleOnSetView(map: any)
    {
        //(mapRef.current as Map).setView([this.state.Latitude, this.state.Longitude], )

        //((mapRef.current as unknown) as MapContainerProps).center = [this.state.Latitude, this.state.Longitude];

        
        const { Latitude, Longitude } = this.state;

        console.log("Coordinate: ", Latitude, ", ", Longitude);
        console.log("Coordinate2: ", this.state.Latitude, ", ", this.state.Longitude);

        console.log("MAP: ",map);

        map.flyTo([41.944, 12.516], 8);

        console.log("THIS: ", this);
        console.log("Coordinate3: ", this.state.Latitude, ", ", this.state.Longitude);

        if(this.state === undefined)
        {
            console.warn("State non definito!!!");
        }
        else
        {
            console.log("State: ", this.state);
        }
        //console.log(this.state === undefined ? "State non definito!!!": this.state);//Lo State è undefined qui!!!!

        //this.setState({ mapContainer: map});




        //map.flyTo([this.state.Latitude, this.state.Longitude], 8);

        //console.log(this.state.Latitude);
        //map.options.center = [this.state.Latitude, this.state.Longitude];


        //const { current = {} } = mapRef;
        //const { leafletElement: map } = current;
    
        //map.setView(disneyWorldLatLng, 14);
      }
}