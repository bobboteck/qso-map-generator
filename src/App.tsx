import React from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import './App.css';
import { ExportData } from './components/ExportData/ExportData';
import { MapView } from './components/MapView/MapView';
import { QsoForm } from './components/QsoForm/QsoForm';
import { QsoList } from './components/QsoList/QsoList';
import { QthForm } from './components/QthForm/QthForm';
import { IMapConfig } from './entities/IMapConfig';
import { IQsoData } from './entities/IQsoData';
import { IQsoMapData } from './entities/IQsoMapData';
import { IQthData } from './entities/IQthData';

export interface IAppProps
{

}

export interface IAppState
{
  configurationMap: IMapConfig;
  qth?: IQthData;
  qsos: IQsoData[];

  qsoMapData?: IQsoMapData;
}

export class App extends React.Component<IAppProps, IAppState>
{
  constructor(props: IAppProps)
  {
    super(props);

    let ZeroPosition: IMapConfig = { Latitude: 0, Longitude: 0, Zoom: 0 };
    let emptyQth: IQthData = { Latitude: 0, Longitude: 0, Locator: "", Location: "", References: [], isPortable: true };

    this.state = 
    {
      configurationMap: ZeroPosition, 
      //qth: emptyQth,
      qsos: [] 
    };
  }

  public render(): React.ReactElement<IAppProps>
  {
    const { qth, qsos, configurationMap, qsoMapData } = this.state;

//console.log("D:",this.state.qsoMapData);

    return(
      <Container>
        <Tabs defaultActiveKey="map" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="map" title="Map">
            Map position and preview
            <MapView QsoMapData={qsoMapData} onChange={this._onChangeMapView} />
          </Tab>
          <Tab eventKey="qth" title="QTH">
            <QthForm CenterLatitude={configurationMap.Latitude} CenterLongitude={configurationMap.Longitude} onChange={this._onChangeQth} />
          </Tab>
          <Tab eventKey="equipment" title="Equipment">
            Equipment
          </Tab>
          <Tab eventKey="qso" title="QSO">
            <Row>
              <Col>
                <QsoForm qthLocator={qth?.Locator} callBack={this._onAddQso} />
              </Col>
            </Row>
            <Row>
              <Col>
                <QsoList data={qsos} onRemoveQso={this._onRemoveQso} />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="export" title="Export">
            <ExportData QsoMapData={qsoMapData} />
          </Tab>
          <Tab eventKey="about" title="About">
            About
          </Tab>
        </Tabs>
      </Container>
    );
  }


  private _onChangeMapView = (configuration: IMapConfig): void =>
  {
    const { qth, qsos } = this.state;

    let qmData: IQsoMapData = { MapConfig: configuration, QTH: qth, QSOs: qsos };

    this.setState({ configurationMap: configuration, qsoMapData: qmData });
  }


  private _onChangeQth = (data: IQthData): void =>
  {
    const { configurationMap, qsos } = this.state;

    let qmData: IQsoMapData = { MapConfig: configurationMap, QTH: data, QSOs: qsos };

    this.setState({ qth: data, qsoMapData: qmData });
  }


  private _onAddQso = (data: IQsoData): void =>
  {
    const { configurationMap, qth, qsos } = this.state;

    let qmData: IQsoMapData = { MapConfig: configurationMap, QTH: qth, QSOs: [...qsos, data] };

    this.setState({ qsos: [...qsos, data], qsoMapData: qmData });
  }

  /**
   * Remove from QSO list objects the QSO with index
   * @param index {number} Array index of QSO to be removed
   */
  private _onRemoveQso = (index: number): void =>
  {
    const { configurationMap, qth, qsos } = this.state;
    // Remove the QSO at the index
    qsos.splice(index, 1);
    // Update map data
    let qmData: IQsoMapData = { MapConfig: configurationMap, QTH: qth, QSOs: qsos };
    // Set new values in the state
    this.setState({ qsos: qsos, qsoMapData: qmData });
  }
}
