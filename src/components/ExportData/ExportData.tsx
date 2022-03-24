import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IExportDataProps } from './IExportDataProps';
import { IExportDataState } from './IExportDataState';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { externalRef, codeJs, codeHtml } from './ExportDataConst';


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
                        <SyntaxHighlighter language="html" style={dark}>{externalRef}</SyntaxHighlighter>
                        <p>
After this code, add the following script, that is the core of intialization and defining map and markers. In the second row of code you need to specifiy the pat of data.json file on your server, remember to substitute the <i>&lt;path of file&gt;</i> with the path.
                        </p>
                        <SyntaxHighlighter language="javascript" style={dark}>{codeJs}</SyntaxHighlighter>
                        <p>
And to define the place where you show the map use this HTML tag. You can use <b>style</b> attribute to define the size of your map.
                        </p>
                        <SyntaxHighlighter language="html" style={dark}>{codeHtml}</SyntaxHighlighter>
                    </Col>
                    <Col md={6}>
                        <p>Copy the following JSON data and save it in a file called data.json</p>
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