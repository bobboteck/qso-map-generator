import { IEquipmentData } from "./IEquipmentData";
import { IMapConfig } from "./IMapConfig";
import { IQsoData } from "./IQsoData";
import { IQthData } from "./IQthData";

export interface IQsoMapData
{
    MapConfig: IMapConfig;
    QTH?: IQthData;
    Equipment?: IEquipmentData;
    QSOs: IQsoData[];
}