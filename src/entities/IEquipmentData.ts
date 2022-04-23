import { IAntennaData } from "./IAntennaData";
import { IRadioData } from "./IRadioData";

export interface IEquipmentData
{
    Radios?: IRadioData[];
    Antennas?: IAntennaData[];
}