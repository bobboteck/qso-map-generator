import * as React from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
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
            FormValidated: false
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
                            <Form.Control type="text" value={PowerSupply} maxLength={60} onChange={this._onChangePowerSupply} />
                        </FloatingLabel>
                    </Col>
                    <Col md={2}>
                        <Button variant="primary" type="button" className="centerButton" onClick={this._onClickAdd}>Add</Button>
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
 
         let powerSupply: string = e.target.value ? e.target.value : "";
         powerSupply = powerSupply.replace(/[`~!@#$%^&*()_|+=?;:'",<>\{\}\[\]\\\/]/gi, '');

         this.setState({ PowerSupply: powerSupply });
     }


    private _onClickAdd = (event: any): void =>
    {
        const radioFormElement: HTMLFormElement = (document.getElementById("formQso") as HTMLFormElement);

        if(radioFormElement.checkValidity() === false)
        {
            event.preventDefault();
            event.stopPropagation();

            this.setState({ FormValidated: true });
        }
        else
        {

        }
    }
}