import * as React from 'react';
import L from 'leaflet';
import { Table } from 'react-bootstrap';
import { Marker, Popup } from 'react-leaflet';
import { IQthData } from '../../entities/IQthData';
import { IQthMarkerProps } from './IQthMarkerProps';
import { IQthMarkerState } from './IQthMarkerState';

const qthIcon = new L.Icon({ iconUrl: 'qso-map-generator/map-station.png', iconSize: [41,41], iconAnchor: [20,40], popupAnchor: [0,-30] });

export class QthMarker extends React.Component<IQthMarkerProps, IQthMarkerState>
{
    constructor(props: IQthMarkerProps)
    {
        super(props);
    }

    public render(): React.ReactElement<IQthMarkerProps>
    {
        let output: React.ReactElement<IQthMarkerProps> = <React.Fragment />;

        // Check if Data is defined
        if(this.props.Data !== undefined && this.props.Data !== null)
        {
            let qth: IQthData = this.props.Data;
            // Check if Latitude and Longitude is defined to show the Marker of QTH
            if(qth.Latitude !== undefined && qth.Latitude !== null && qth.Longitude !== undefined && qth.Longitude !== null)
            {
                let lat: number = (qth.Latitude as number);
                let lng: number = (qth.Longitude as number);
                // The render object for QTH
                output = 
                    <Marker position={[lat, lng]} icon={qthIcon}>
                        <Popup>
                            {qth.Location}<br />{qth.Locator}
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Reference</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    [...qth.References].map((r, i) =>
                                    <tr key={i}>
                                        <td>{r.Code}</td>
                                        <td>{r.Type}</td>
                                    </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </Popup>
                    </Marker>
            }
        }

        return(output);
    }
}