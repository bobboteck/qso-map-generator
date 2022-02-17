import * as React from 'react';
import { IQsoFormProps } from './IQsoFormProps';
import { IQsoFormState } from './IQsoFormState';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IQsoData } from '../../entities/IQsoData';


export class QsoForm extends React.Component<IQsoFormProps, IQsoFormState>
{
    constructor(props: IQsoFormProps)
    {
        super(props);

        this.state =
        {
            DateQso: "",
            TimeQso: "",
            Callsign: "",
            Locator: "",
            Latitude: 0,
            Longitude: 0,
            Band: "",
            Mode: "",
            Frequency: undefined,
            validated: false
        };
    }

    public render(): React.ReactElement<IQsoFormProps>
    {
        const { DateQso, TimeQso, Callsign, Locator, Latitude, Longitude, Band, Mode, Frequency, validated } = this.state;

        return(
            <Form validated={validated} id="formQso" >
                <Row className='mb-3'>
                    <Form.Group as={Col} md="4" controlId="dateQso">
                        <Form.Label>Date *</Form.Label>
                        <Form.Control type="date" className="input" value={DateQso} onChange={this._onChangeDate} placeholder="Date in format dd/mm/yyyy" required />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="timeQso">
                        <Form.Label>Time *</Form.Label>
                        <Form.Control type="time" className="input" value={TimeQso} onChange={this._onChangeTime} placeholder="Time in format hh:mm" required pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="callSignQso">
                        <Form.Label>Callsign *</Form.Label>
                        <Form.Control type="text" className="input" value={Callsign} onChange={this._onChangeCallsign} placeholder="Callsign of station" required />
                    </Form.Group>
                </Row>

                <Row className='mb-3'>
                    <Form.Group as={Col} md="4" controlId="bandQso">
                        <Form.Label>Band</Form.Label>
                        <Form.Select aria-label="Band used in QSO">
                            <option></option>
                            <option value="6m">6 m</option>
                            <option value="2m">2 m</option>
                            <option value="70cm">70 cm</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="frequencyQso">
                        <Form.Label>Frequency</Form.Label>
                        <Form.Control type="number" className="input" value={Frequency} onChange={this._onChangeFrequency} placeholder="" />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="modeQso">
                        <Form.Label>Mode</Form.Label>
                        <Form.Select aria-label="Mode used in QSO" onChange={this._onChangeMode}>
                            <option></option>
                            <option value="FM">FM</option>
                            <option value="SSB">SSB</option>
                            <option value="CW">CW</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="locatorQso">
                        <Form.Label>Locator *</Form.Label>
                        <Form.Control type="text" className="input" value={Locator} onChange={this._onChangeLocator} placeholder="Locator in format JN61aa" required />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="latitudeQso">
                        <Form.Label>Latitude *</Form.Label>
                        <Form.Control type="number" className="input" value={Latitude} onChange={this._onChangeLatitude} placeholder="" required />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="longitudeQso">
                        <Form.Label>Longitude *</Form.Label>
                        <Form.Control type="number" className="input" value={Longitude} onChange={this._onChangeLongitude} placeholder="" required />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="3" controlId="rstrQso">
                        <Form.Label>RST received</Form.Label>
                        <Form.Control type="number" className="input" />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="rstsQso">
                        <Form.Label>RST sent</Form.Label>
                        <Form.Control type="number" className="input" />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="txPowerQso">
                        <Form.Label>TX power</Form.Label>
                        <Form.Control type="number" className="input" />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="rxPowerQso">
                        <Form.Label>RX Power</Form.Label>
                        <Form.Control type="number" className="input" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="10" controlId="noteQso">
                        <Form.Label>Note</Form.Label>
                        <Form.Control type="text" className="input" />
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="addQso">
                        <Form.Label>&nbsp;</Form.Label>
                        <Button variant="primary" type="button" className="AddButton" onClick={this._callBack}>Add</Button>
                    </Form.Group>
                </Row>
                
            </Form>
        );
    }

    private _onChangeDate = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ DateQso: e.target.value ? e.target.value : "" });
    }

    private _onChangeTime = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ TimeQso: e.target.value ? e.target.value : "" });
    }

    private _onChangeCallsign = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ Callsign: e.target.value ? e.target.value : "" });
    }

    private _onChangeLocator = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ Locator: e.target.value ? e.target.value : "" });
    }

    private _onChangeLatitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ Latitude: e.target.value ? Number(e.target.value) : 0 });
    }

    private _onChangeLongitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ Longitude: e.target.value ? Number(e.target.value) : 0 });
    }

    private _onChangeFrequency = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ Frequency: e.target.value ? Number(e.target.value) : undefined });
    }

    private _onChangeMode = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    {
        this.setState({ Mode: e.target.value ? e.target.value : ""});
    }


    private _callBack = (event: any): void =>
    {
        const { DateQso, TimeQso, Callsign, Locator, Mode, Frequency } = this.state;

        const qsoFormElement: HTMLFormElement = (document.getElementById("formQso") as HTMLFormElement);

        if(qsoFormElement.checkValidity() === false)
        {
            event.preventDefault();
            event.stopPropagation();

            this.setState({ validated: true });
        }
        else
        {
            let data: IQsoData = 
            {
                Date: DateQso,
                Time: TimeQso,
                CallSign: Callsign,
                Locator: Locator,
                Band: "",
                Mode: Mode,
                Frequency: Frequency ? Number(Frequency) : undefined
            };
    
            this.setState({ Callsign: "", Locator: "", Latitude: 0, Longitude: 0 });
    
            this.props.callBack(data);
        }
    }
}