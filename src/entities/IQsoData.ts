export interface IQsoData
{
    Date: string;       /* Change this two property in only one dateTime??? */
    Time: string;       /* Change this two property in only one dateTime??? */
    CallSign: string;
    Locator: string;
    Latitude: number;
    Longitude: number;
    QRB: number;
    Band: string;
    Mode: string;
    Frequency?: number;
    RstReceived: number;
    RstSent: number;
    TxPower?: number;
    RxPower?: number;
    Note?: string;
}