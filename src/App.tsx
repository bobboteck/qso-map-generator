import React from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import './App.css';
import { MapView } from './components/MapView/MapView';
import { QsoForm } from './components/QsoForm/QsoForm';
import { QsoList } from './components/QsoList/QsoList';
import { SummitForm } from './components/QthForm/QthForm';
import { IQsoData } from './entities/IQsoData';

export interface IAppProps
{

}

export interface IAppState
{
  qsos: IQsoData[];
  localLat: any;
}

export class App extends React.Component<IAppProps, IAppState>
{
  constructor(props: IAppProps)
  {
    super(props);

    this.state = { qsos: [], localLat: 0 };
  }

  public render(): React.ReactElement<IAppProps>
  {
    const { qsos, localLat } = this.state;

    return(
      <Container>
        <Tabs defaultActiveKey="map" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="map" title="Map">
            Map information and preview
            <MapView />
          </Tab>
          <Tab eventKey="qth" title="QTH">
            <SummitForm />
          </Tab>
          <Tab eventKey="equipment" title="Equipment">
            Equipment
          </Tab>
          <Tab eventKey="qso" title="QSO">
            <Row>
              <Col>
                <QsoForm callBack={this._onAddQso} />
              </Col>
            </Row>
            <Row>
              <Col>
                <QsoList data={qsos} />
              </Col>
            </Row>    
          </Tab>
          <Tab eventKey="about" title="About">
            About
          </Tab>
        </Tabs>
      </Container>
    );
  }

  private _onAddQso = (data: IQsoData): void =>
  {
    const { qsos } = this.state;

    this.setState({ qsos: [...qsos, data] });

    console.log(...qsos);
  }


  private _onChangeLatitude = (lat: any): void =>
  {
    console.log(lat);
  }
}
