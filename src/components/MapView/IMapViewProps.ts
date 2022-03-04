import { IMapConfig } from "../../entities/IMapConfig";
import { IQsoMapData } from "../../entities/IQsoMapData";

export interface IMapViewProps
{
    QsoMapData?: IQsoMapData;

    onChange: any;  //IMapConfig;
}