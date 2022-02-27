import * as React from 'react';
import { Button, Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import { IQthFormProps } from './IQthFormProps';
import { IQthFormState } from './IQthFormState';

const minLatitude: number = -90;
const maxLatitude: number = 90;

const minLongitude: number = -180;
const maxLongitude: number = 180;

export class QthForm extends React.Component<IQthFormProps, IQthFormState>
{
    constructor(props: IQthFormProps)
    {
        super(props);

        this.state = 
        {
            Locator: "",
            Latitude: 0,
            Longitude: 0,
            Location: "",
            References: []
        };
    }

    public render(): React.ReactElement<IQthFormProps>
    {
        const { Latitude, Longitude } = this.state;

        return(
            <Form>
                <Row className="mb-3">
                    <h4>QTH information</h4>
                    <p>
Insert the information and position of your station during the activity
                    </p>
                </Row>
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel controlId="LocatorSummitForm" label="Locator">
                            <Form.Control type="text" placeholder="jn00aa" onChange={this._onChanegLocator} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="latitudeMapForm" label="Latitude">
                            <Form.Control type="number" value={Latitude} required min={minLatitude} max={maxLatitude} onChange={this._onChangeLatitude} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                    <FloatingLabel controlId="longitudeMapForm" label="Longitude">
                            <Form.Control type="number" value={Longitude} required min={minLongitude} max={maxLongitude} onChange={this._onChangeLongitude} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <Button variant="primary" type="button" className="centerButton" onClick={this._onClickCurrentCenter}>Use current center</Button>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel controlId="LocatoionSummitForm" label="Location">
                            <Form.Control type="text" placeholder="Location" />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel controlId="ReferenceSummitForm" label="Reference">
                            <Form.Control type="text" placeholder="Reference" />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="referenceTypeSelect" label="Reference type">
                            <Form.Select aria-label="Select reference type">
                                <option></option>
                                <option value="SOTA">SOTA</option>
                                <option value="POTA">POTA</option>
                                <option value="IOTA">IOTA</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <Button variant="secondary" type="button" className="centerButton" onClick={this._onClickAdd}>Add</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md>
                        <p>
List of added Reference:
                        </p>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Reference</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                        {
                            [...this.state.References].map((x, i) =>
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{x.Code}</td>
                                    <td>{x.Type}</td>
                                </tr>
                            )
                        }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Form>
        );
    }

    private _onChanegLocator = (e: React.ChangeEvent<HTMLInputElement>): void =>
    {

    }

    private _onChangeLatitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {

    }

    /**
     * Change Longitude in the map, and check if value fault in the expetted range
     * @param e Event on the element
     */
    private _onChangeLongitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {

    }

    private _onClickCurrentCenter = (event: any): void =>
    {
        console.log("onCurrentCenter: ", this.props.CenterLatitude, "-", this.props.CenterLongitude);

        this.setState({ Latitude: this.props.CenterLatitude, Longitude: this.props.CenterLongitude });

        //TODO: .....
        //this.props.onChange()
    }


    private _onClickAdd = (event: any): void =>
    {

    }
}