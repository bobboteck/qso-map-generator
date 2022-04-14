import * as React from 'react';
import { Button, Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import { IRadioData } from '../../entities/IRadioData';
import { IRadioFormProps } from './IRadioFormProps';
import { IRadioFormState } from './IRadioFormState';

export class RadioForm extends React.Component<IRadioFormProps, IRadioFormState>
{
    constructor(props: IRadioFormProps)
    {
        super(props);

        this.state =
        {
            Brand: "",
            Model: "",
            PowerSupply: "",
            FormValidated: false,
            Radios: []
        };
    }

    public render(): React.ReactElement<IRadioFormProps>
    {
        const { Brand, Model, PowerSupply, FormValidated } = this.state;

        return(
            <Form validated={FormValidated} id="radioForm">
                <Row className="mb-3">
                    <h4>Radios data</h4>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <FloatingLabel controlId="RadioBrandField" label="Brand">
                            <Form.Control type="text" value={Brand} maxLength={20} required={true} onChange={this._onChangeBrand} />
                        </FloatingLabel>
                    </Col>
                    <Col md={6}>
                        <FloatingLabel controlId="RadioModelField" label="Model">
                            <Form.Control type="text" value={Model} maxLength={20} required={true} onChange={this._onChangeModel} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={10}>
                        <FloatingLabel controlId="PowerSupplyField" label="Power supply">
                            <Form.Control type="text" value={PowerSupply} maxLength={60} required={false} onChange={this._onChangePowerSupply} />
                        </FloatingLabel>
                    </Col>
                    <Col md={2}>
                        <Button variant="primary" type="button" className="centerButton" onClick={this._onClickAdd}>Add</Button>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <p>Listo of radios:</p>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Power supply</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                [...this.state.Radios].map((x, i) =>
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{x.Brand}</td>
                                    <td>{x.Model}</td>
                                    <td>{x.PowerSupply}</td>
                                    <td><Button variant="outline-danger" onClick={() => this._onClickRemoveRadio(i)}>✕</Button></td>
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
    private _onChangePowerSupply = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        const { PowerSupply } = this.state;
        // Prevents the insertion of unwanted characters
        let powerSupply: string = e.target.value ? e.target.value : "";
        powerSupply = powerSupply.replace(/[`~!@#$%^&*()_|+=?;:'",<>\{\}\[\]\\\/]/gi, '');

        this.setState({ PowerSupply: powerSupply });
    }

    /**
     * Add a new Radio into the object if form is valid
     * @param event Submit event of button form
     */
    private _onClickAdd = (event: any): void =>
    {
        const { Brand, Model, PowerSupply, Radios } = this.state;
        // Get html element of form for the validation check
        const radioFormElement: HTMLFormElement = (document.getElementById("radioForm") as HTMLFormElement);
        // Check the validation of form
        if(radioFormElement.checkValidity() === false)
        {
            event.preventDefault();
            event.stopPropagation();

            this.setState({ FormValidated: true });
        }
        else
        {
            // Define new object to update data
            let newRadio: IRadioData = { Brand: Brand, Model: Model, PowerSupply: PowerSupply };
            let newRadioData: IRadioData[] = [...Radios, newRadio];
            // Set local state with the new data insered by user, and clean the form fields
            this.setState({ Radios: newRadioData, Brand: "", Model: "", PowerSupply: "" });
            // Add new radio data in the onchange props
            this.props.onChange(newRadioData);
        }
    }

    /**
     * Remove Radio to the list
     * @param index {number} Index of item to be removed from the list
     */
     private _onClickRemoveRadio = (index: number): void =>
     {
         const { Radios } = this.state;
 
         // Remove Radio
         Radios.splice(index, 1);
         this.setState({ Radios: Radios });
 
         // Update OnChange
         this.props.onChange(Radios);
     }
}