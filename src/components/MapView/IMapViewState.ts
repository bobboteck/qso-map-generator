import { Map } from "leaflet";

export interface IMapViewState
{
    Latitude: number;
    Longitude: number;
    ZoomLevel: number;
    /** Leaflet Map object */
    objMap?: Map;
}