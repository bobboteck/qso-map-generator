import * as React from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { ISummitFormProps } from './ISummitFormProps';
import { ISummitFormState } from './ISummitFormState';

export class SummitForm extends React.Component<ISummitFormProps, ISummitFormState>
{
    constructor(props: ISummitFormProps)
    {
        super(props);
    }

    public render(): React.ReactElement<ISummitFormProps>
    {
        return(
            <Form>
                <Row className="mb-3">
                    <h4>Activation info</h4>
                </Row>
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel controlId="LocatorSummitForm" label="Locator">
                            <Form.Control type="text" placeholder="jn00aa" />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="LatitudeSummitForm" label="Latitude QTH">
                            <Form.Control type="text" placeholder="Latitude QTH" />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="LongitudeSummitForm" label="Longitude QTH">
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