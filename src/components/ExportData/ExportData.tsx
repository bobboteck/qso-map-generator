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
                    <Col md={12}>
                        <h4>Export data</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p>
To use the JSON data file in your web site, you need to add in a page this two row of code possible in the header section of HTML.
                        </p>
                        <pre>
                            <code>
&lt;link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/&gt;<br />
&lt;!-- Make sure you put this AFTER Leaflet's CSS --&gt;<br />
&lt;script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""&gt;&lt;/script&gt;
                            </code>
                        </pre>
                        <p>
After this code, add the following script, that is the core of intialization and defining map and markers
                        </p>
                        <pre>
                            <code>
                                
                            </code>
                        </pre>
                    </Col>
                    <Col md={6}>
                        <div className="jsonDataContainer">
                            <pre>
                            {JSON.stringify(this.props.QsoMapData, undefined, 2)}
                            </pre>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}