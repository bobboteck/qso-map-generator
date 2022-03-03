import * as React from 'react';
import { Button, Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import { IQthData } from '../../entities/IQthData';
import { IReference } from '../../entities/IReference';
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
            ReferenceCode: "",
            ReferenceType: "",
            References: []
        };
    }

    public render(): React.ReactElement<IQthFormProps>
    {
        const { Locator, Latitude, Longitude, Location, ReferenceCode, ReferenceType, References } = this.state;

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
                        <FloatingLabel controlId="ReferenceLocatorField" label="Locator">
                            <Form.Control type="text" value={Locator} maxLength={6} onChange={this._onChanegLocator} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="ReferenceLatitudeField" label="Latitude">
                            <Form.Control type="number" value={Latitude} required min={minLatitude} max={maxLatitude} onChange={this._onChangeLatitude} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                    <FloatingLabel controlId="ReferenceLongitudeField" label="Longitude">
                            <Form.Control type="number" value={Longitude} required min={minLongitude} max={maxLongitude} onChange={this._onChangeLongitude} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <Button variant="primary" type="button" className="centerButton" onClick={this._onClickCurrentCenter}>Use current center</Button>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel controlId="ReferenceLocatoionField" label="Location">
                            <Form.Control type="text" value={Location} maxLength={100} onChange={this._onChangeLocation} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel controlId="ReferenceCodeField" label="Reference code">
                            <Form.Control type="text" value={ReferenceCode} maxLength={10} onChange={this._onChangeReferenceCode} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="ReferenceTypeSelect" label="Reference type">
                            <Form.Select aria-label="Select reference type" onChange={this._onChangeReferenceType} value={ReferenceType}>
                                <option></option>
                                <option value="SOTA">SOTA</option>
                                <option value="POTA">POTA</option>
                                <option value="IOTA">IOTA</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <Button variant="secondary" type="button" className="centerButton" onClick={this._onClickAdd} disabled={References.length <= 4 ? false : true}>Add</Button>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                        {
                            [...this.state.References].map((x, i) =>
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{x.Code}</td>
                                    <td>{x.Type}</td>
                                    <td><Button variant="outline-danger" onClick={() => this._onClickRemoveReference(i)}>✕</Button></td>
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


    /**
     * Manage onChange event and update QthData output information
     * @param e Event on the element
     */
    private _onChanegLocator = (e: React.ChangeEvent<HTMLInputElement>): void =>
    {
        const { Latitude, Longitude, Location, References } = this.state;

        let loc: string = e.target.value ? e.target.value : "";
        this.setState({ Locator: loc});

        // Update OnChange
        let qthData: IQthData = { Latitude: Latitude, Longitude: Longitude, Locator: loc, Location: Location, References: References, isPortable: true };
        this.props.onChange(qthData);
    }

    /**
     * Manage onChange event and update QthData output information
     * @param e Event on the element
     */
    private _onChangeLatitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        const { Longitude, Locator, Location, References } = this.state;

        let lat: number = e.target.value ? Number(e.target.value) : 0;
        this.setState({ Latitude: lat});

        // Update OnChange
        let qthData: IQthData = { Latitude: lat, Longitude: Longitude, Locator: Locator, Location: Location, References: References, isPortable: true };
        this.props.onChange(qthData);
    }

    /**
     * Manage onChange event and update QthData output information
     * @param e Event on the element
     */
    private _onChangeLongitude = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        const { Latitude, Locator, Location, References } = this.state;
        
        let lng: number = e.target.value ? Number(e.target.value) : 0;
        this.setState({ Longitude: lng});

        // Update OnChange
        let qthData: IQthData = { Latitude: Latitude, Longitude: lng, Locator: Locator, Location: Location, References: References, isPortable: true };
        this.props.onChange(qthData);
    }

    /**
     * Use current Map center as QTH position
     */
    private _onClickCurrentCenter = (): void =>
    {
        const { Locator, Location, References } = this.state;

        this.setState({ Latitude: this.props.CenterLatitude, Longitude: this.props.CenterLongitude });

        // Update OnChange
        let qthData: IQthData = { Latitude: this.props.CenterLatitude, Longitude: this.props.CenterLongitude, Locator: Locator, Location: Location, References: References, isPortable: true };
        this.props.onChange(qthData);
    }

    /**
     * Manage onChange event and update QthData output information
     * @param e Event on the element
     */
    private _onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        const { Latitude, Longitude, Locator, References } = this.state;

        let loc: string = e.target.value ? e.target.value : "";
        this.setState({ Location: loc });

        // Update OnChange
        let qthData: IQthData = { Latitude: Latitude, Longitude: Longitude, Locator: Locator, Location: loc, References: References, isPortable: true };
        this.props.onChange(qthData);
    }

    /**
     * Manage onChange event
     * @param e Event on the element
     */
    private _onChangeReferenceCode = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        this.setState({ ReferenceCode: e.target.value ? e.target.value : "" });
    }

    /**
     * Manage onChange event
     * @param e Event on the element
     */
    private _onChangeReferenceType = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    {
        this.setState({ ReferenceType: e.target.value ? e.target.value : ""});
    }

    /**
     * Add a new Reference to the list
     */
    private _onClickAdd = (): void =>
    {
        const { Latitude, Longitude, Locator, Location, References, ReferenceCode, ReferenceType } = this.state;

        if(ReferenceCode !== "" && ReferenceType !== "")
        {
            let newReference: IReference = { Code: ReferenceCode, Type: ReferenceType };

            this.setState({ References: [ ...References, newReference ], ReferenceCode: "", ReferenceType: "" });

            // Update OnChange
            let qthData: IQthData = { Latitude: Latitude, Longitude: Longitude, Locator: Locator, Location: Location, References: [ ...References, newReference ], isPortable: true };
            this.props.onChange(qthData);
        }
        else
        {
            alert("Insert Reference Code and Type to add one!");
        }
    }

    /**
     * Remove Reference to the list
     * @param index {number} Index of item to be removed from the list
     */
    private _onClickRemoveReference = (index: number): void =>
    {
        const { Latitude, Longitude, Locator, Location, References } = this.state;

        // Remove reference
        References.splice(index, 1);
        this.setState({ References: References });

        // Update OnChange
        let qthData: IQthData = { Latitude: Latitude, Longitude: Longitude, Locator: Locator, Location: Location, References: References, isPortable: true };
        this.props.onChange(qthData);
    }
}