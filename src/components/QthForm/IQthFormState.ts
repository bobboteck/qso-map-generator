import { IReference } from "../../entities/IReference";

export interface IQthFormState
{
    Locator: string;
    Latitude: number;
    Longitude: number;
    Location: string;
    ReferenceCode: string;
    ReferenceType: string;
    
    References: IReference[];
}