import * as React from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
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
            Latitude: 0,
            Longitude: 0
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
                            <Form.Control type="text" placeholder="jn00aa" />
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
                        <Button variant="primary" type="button" className="centerButton" onClick={this._onCurrentCenterClick}>Use current center</Button>
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
                </Row>
            </Form>
        );
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

    private _onCurrentCenterClick = (event: any): void =>
    {
        console.log("onCurrentCenter: ", this.props.CenterLatitude, "-", this.props.CenterLongitude);

        this.setState({ Latitude: this.props.CenterLatitude, Longitude: this.props.CenterLongitude });

        //TODO: .....
        //this.props.onChange()
    }

}