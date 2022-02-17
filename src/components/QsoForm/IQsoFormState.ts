export interface IQsoFormState
{
    /** Required */
    DateQso: string;
    /** Required */
    TimeQso: string;
    /** Required */
    Callsign: string;
    /** Required */
    Locator: string;
    /** Required, but is nullable for a better experience in form */
    Latitude?: number;
    /** Required, but is nullable for a better experience in form */
    Longitude?: number;
    Qrb: number;

    Band: string;
    Mode: string;
    Frequency?: number;

    RstReceived?: number;
    RstSent?: number;
    TxPower?: number;
    RxPower?: number;

    Note?: string;

    validated: boolean;
}