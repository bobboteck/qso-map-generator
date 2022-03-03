import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IExportDataProps } from './IExportDataProps';
import { IExportDataState } from './IExportDataState';

export class ExportData extends React.Component<IExportDataProps, IExportDataState>
{
    constructor(props: IExportDataProps)
    {
        super(props);
    }

    public render(): React.ReactElement<IExportDataProps>
    {
        return(
            <Container>
                <Row>
                    <Col>
                        <h4>Export data</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Lorem ipsum dolor sit amen
                    </Col>
                    <Col>
                        <div className="jsonDataContainer">
                            <pre>
                            {JSON.stringify(this.props.qsoMapData, undefined, 2)}
                            </pre>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}