import * as React from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { IQthFormProps } from './IQthFormProps';
import { IQthFormState } from './IQthFormState';

export class SummitForm extends React.Component<IQthFormProps, IQthFormState>
{
    constructor(props: IQthFormProps)
    {
        super(props);
    }

    public render(): React.ReactElement<IQthFormProps>
    {
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
                        <FloatingLabel controlId="LatitudeSummitForm" label="Latitude">
                            <Form.Control type="text" placeholder="Latitude QTH" required />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="LongitudeSummitForm" label="Longitude">
                            <Form.Control type="text" placeholder="Longitude QTH" />
                        </FloatingLabel>
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
}