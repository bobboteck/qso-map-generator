import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import { QsoForm } from './components/QsoForm/QsoForm';
import { QsoList } from './components/QsoList/QsoList';
import { SummitForm } from './components/SummitForm/SummitForm';
import { IQsoData } from './entities/IQsoData';

export interface IAppProps
{

}

export interface IAppState
{
  qsos: IQsoData[];
}

export class App extends React.Component<IAppProps, IAppState>
{
  constructor(props: IAppProps)
  {
    super(props);

    this.state = { qsos: [] };
  }

  public render(): React.ReactElement<IAppProps>
  {
    const { qsos } = this.state;

    return(
      <Container>
      <Row>
        <Col>
          <SummitForm></SummitForm>
        </Col>
        <Col>
          <QsoForm callBack={this._onAddQso} />
        </Col>
      </Row>
      <Row>
        <Col>
          <QsoList data={qsos} />
        </Col>
      </Row>
    </Container>
    );
  }

  private _onAddQso = (data: IQsoData): void =>
  {
    const { qsos } = this.state;

    this.setState({ qsos: [...qsos, data] });
  }
}
