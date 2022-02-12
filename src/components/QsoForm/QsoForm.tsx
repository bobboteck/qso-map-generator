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
            CallSign: "",
            Locator: "",
            Band: "",
            Mode: "",
            Frequency: ""
        };
    }

    public render(): React.ReactElement<IQsoFormProps>
    {
        const { DateQso, TimeQso, CallSign, Locator, Band, Mode, Frequency } = this.state;

        return(
            <Form>
                <Row className='mb-3'>
                    <Form.Group as={Col} controlId="dateQso">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="text" className="input" value={DateQso} onChange={this._onChangeDate} placeholder="Date in format dd/mm/yyyy" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="timeQso">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="text" className="input" value={TimeQso} onChange={this._onChangeTime} placeholder="Time in format hh:mm" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="callSignQso">
                        <Form.Label>Call sign</Form.Label>
                        <Form.Control type="text" className="input" value={CallSign} onChange={this._onChangeCallSign} placeholder="Call sign of station" />
                    </Form.Group>
                </Row>

                <Row className='mb-3'>
                    <Form.Group as={Col} controlId="bandQso">
                        <Form.Label>Band</Form.Label>
                        <Form.Select aria-label="Band used in QSO">
                            <option>Select the band</option>
                            <option value="6m">6 m</option>
                            <option value="2m">2 m</option>
                            <option value="70cm">70 cm</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="frequencyQso">
                        <Form.Label>Frequency</Form.Label>
                        <Form.Control type="text" className="input" value={Frequency} onChange={this._onChangeFrequency} placeholder="" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="modeQso">
                        <Form.Label>Mode</Form.Label>
                        <Form.Select aria-label="Mode used in QSO" onChange={this._onChangeMode}>
                            <option>Select the mode</option>
                            <option value="FM">FM</option>
                            <option value="SSB">SSB</option>
                            <option value="CW">CW</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="LocatorQso">
                        <Form.Label>Locator</Form.Label>
                        <Form.Control type="text" className="input" value={Locator} onChange={this._onChangeLocator} placeholder="Locator in format JN61aa" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="LatitudeQso">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control type="text" className="input" value={Locator} onChange={this._onChangeLocator} placeholder="" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="LongitudeQso">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control type="text" className="input" value={Locator} onChange={this._onChangeLocator} placeholder="" />
                    </Form.Group>
                </Row>

                <Button variant="primary mb-3" type="button" onClick={this._callBack}>Add</Button>
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

    private _onChangeCallSign = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ CallSign: e.target.value ? e.target.value : "" });
    }

    private _onChangeLocator = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ Locator: e.target.value ? e.target.value : "" });
    }

    private _onChangeFrequency = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ Frequency: e.target.value ? e.target.value : "" });
    }

    private _onChangeMode = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    {
        this.setState({ Mode: e.target.value ? e.target.value : ""});
    }


    private _callBack = (): void =>
    {
        const { DateQso, TimeQso, CallSign, Locator, Mode, Frequency } = this.state;

        let data: IQsoData = 
        {
            Date: DateQso,
            Time: TimeQso,
            CallSign: CallSign,
            Locator: Locator,
            Band: "",
            Mode: Mode,
            Frequency: Frequency ? Number(Frequency) : undefined
        };

        this.setState({ CallSign: "", Locator: "", Frequency: "" });

        this.props.callBack(data);
    }
}