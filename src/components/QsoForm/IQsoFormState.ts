export interface IQsoFormState
{
    DateQso: string;
    TimeQso: string;
    Callsign: string;
    Locator: string;
    Latitude: number;
    Longitude:number;
    Band: string;
    Mode: string;
    Frequency?: number;

    validated: boolean;
}