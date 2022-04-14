import { IAntennaData } from "../../entities/IAntennaData";

export interface IAntennaFormState
{
    Brand: string;
    Model: string;
    Other: string;

    FormValidated: boolean;

    Antennas: IAntennaData[];
}