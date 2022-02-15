export interface IQsoFormState
{
    DateQso: string;
    TimeQso: string;
    Callsign: string;
    Locator: string;
    Band: string;
    Mode: string;
    Frequency?: string;

    validated: boolean;
    InvalidTimeMessage: string;
}