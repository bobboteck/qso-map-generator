import { IMapConfig } from "../../entities/IMapConfig";

export interface IMapViewProps
{
/*    Latitude: any;
    Longitude?: number;
    ZoomLevel?: number; */

    onChange: any;  //IMapConfig;

    //MapConfiguration(lat: number, lng: number, zoom: number): IMapConfig;
    /*
    {
        let configuration: IMapConfig = { Latitude: lat, Longitude: lng, Zoom: zoom };

        return configuration;
    };
    */
}
/*
export class IMapViewProps implements IMapViewProps
{
    MapConfiguration(lat: number, lng: number, zoom: number): IMapConfig
    {
        let configuration: IMapConfig = { Latitude: lat, Longitude: lng, Zoom: zoom };

        return configuration;
    }
}
*/