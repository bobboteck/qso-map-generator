import { IReference } from "./IReference";

export interface IQthData
{
    Latitude: number;
    Longitude: number;
    Locator: string;
    isPortable: boolean;
    Location: string;
    References: IReference;
}