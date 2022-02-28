import { IReference } from "./IReference";

export interface IQthData
{
    Latitude: number;
    Longitude: number;
    Locator: string;
    Location: string;
    References: IReference[];
    isPortable: boolean;
}