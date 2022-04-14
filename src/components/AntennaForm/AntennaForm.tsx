import * as React from 'react';
import { Button, Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import { IAntennaData } from '../../entities/IAntennaData';
import { IAntennaFormProps } from './IAntennaFormProps';
import { IAntennaFormState } from './IAntennaFormState';

export class AntennaForm extends React.Component<IAntennaFormProps, IAntennaFormState>
{
    constructor(props: IAntennaFormProps)
    {
        super(props);

        this.state =
        {
            Brand: "",
            Model: "",
            Other: "",
            FormValidated: false,
            Antennas: []
        };
    }

    public render(): React.ReactElement<IAntennaFormProps>
    {
        const { Brand, Model, Other, FormValidated } = this.state;

        return(
            <Form validated={FormValidated} id="AntennaForm">
                <Row className="mb-3">
                    <h4>Antennas data</h4>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <FloatingLabel controlId="AntennaBrandField" label="Brand">
                            <Form.Control type="text" value={Brand} maxLength={20} required={true} onChange={this._onChangeBrand} />
                        </FloatingLabel>
                    </Col>
                    <Col md={6}>
                        <FloatingLabel controlId="AntennaModelField" label="Model">
                            <Form.Control type="text" value={Model} maxLength={20} required={true} onChange={this._onChangeModel} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={10}>
                        <FloatingLabel controlId="OtherField" label="Other info">
                            <Form.Control type="text" value={Other} maxLength={60} required={false} onChange={this._onChangeOther} />
                        </FloatingLabel>
                    </Col>
                    <Col md={2}>
                        <Button variant="primary" type="button" className="centerButton" onClick={this._onClickAdd}>Add</Button>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <p>Listo of antennas:</p>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Other info</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                [...this.state.Antennas].map((x, i) =>
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{x.Brand}</td>
                                    <td>{x.Model}</td>
                                    <td>{x.Other}</td>
                                    <td><Button variant="outline-danger" onClick={() => this._onClickRemoveAntenna(i)}>✕</Button></td>
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
     * Manage onChange event
     * @param e Event on the element
     */
    private _onChangeBrand = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        const { Brand } = this.state;
        // Prevents the insertion of unwanted characters
        let brand: string = e.target.value ? e.target.value : "";
        brand = brand.replace(/[`~!@#$%^&*()_|+=?;:'",<>\{\}\[\]\\\/]/gi, '');

        this.setState({ Brand: brand });
    }

    /**
     * Manage onChange event
     * @param e Event on the element
     */
    private _onChangeModel = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        const { Model } = this.state;
        // Prevents the insertion of unwanted characters
        let model: string = e.target.value ? e.target.value : "";
        model = model.replace(/[`~!@#$%^&*()_|+=?;:'",<>\{\}\[\]\\\/]/gi, '');

        this.setState({ Model: model });
    }

    /**
     * Manage onChange event
     * @param e Event on the element
     */
    private _onChangeOther = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        const { Other } = this.state;
        // Prevents the insertion of unwanted characters
        let other: string = e.target.value ? e.target.value : "";
        other = other.replace(/[`~!@#$%^&*()_|+=?;:'",<>\{\}\[\]\\\/]/gi, '');

        this.setState({ Other: other });
    }

    /**
     * Add a new Antenna into the object if form is valid
     * @param event Submit event of button form
     */
    private _onClickAdd = (event: any): void =>
    {
        const { Brand, Model, Other, Antennas } = this.state;
        // Get html element of form for the validation check
        const antennaFormElement: HTMLFormElement = (document.getElementById("AntennaForm") as HTMLFormElement);
        // Check the validation of form
        if(antennaFormElement.checkValidity() === false)
        {
            event.preventDefault();
            event.stopPropagation();

            this.setState({ FormValidated: true });
        }
        else
        {
            // Define new object to update data
            let newAntenna: IAntennaData = { Brand: Brand, Model: Model, Other: Other };
            let newAntennaData: IAntennaData[] = [...Antennas, newAntenna];
            // Set local state with the new data insered by user, and clean the form fields
            this.setState({ Antennas: newAntennaData, Brand: "", Model: "", Other: "" });
            // Add new Antenna data in the onchange props
            this.props.onChange(newAntennaData);
        }
    }

    /**
     * Remove Antenna to the list
     * @param index {number} Index of item to be removed from the list
     */
     private _onClickRemoveAntenna = (index: number): void =>
     {
         const { Antennas } = this.state;
 
         // Remove Antenna
         Antennas.splice(index, 1);
         this.setState({ Antennas: Antennas });
 
         // Update OnChange
         this.props.onChange(Antennas);
     }
}