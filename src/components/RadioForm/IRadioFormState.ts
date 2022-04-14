import { IRadioData } from "../../entities/IRadioData";

export interface IRadioFormState
{
    Brand: string;
    Model: string;
    PowerSupply: string;

    FormValidated: boolean;

    Radios: IRadioData[];
}