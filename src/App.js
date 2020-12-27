import './App.css';
import React from 'react';
import AddAppointment from './components/AddAppointment';
import ArrivalToCprStationConfirmation from './components/ArrivalToCprStationConfirmation';
import VaccineConfirmation from './components/VaccineConfirmation';

import Container from '@material-ui/core/Container';
import {Route, Switch} from 'react-router-dom';
import WaitingRoomLayout from './components/WaitingRoomLayout';
import NavBar from './components/NavBar';
import VaccineWaitingRoom from './components/VaccineWaitingRoom';
import CPRWaitingRoom from './components/CPRWaitingRoom';

function App() {
  return (
    <div className="App">
      <NavBar />

      <Container>
        <Switch>
          <Route exact path="/" component={AddAppointment} />
          <Route
            path="/arrivalToCprStationConfirmation/1"
            component={ArrivalToCprStationConfirmation}
          />
          <Route
            path="/arrivalToCprStationConfirmation/2"
            component={ArrivalToCprStationConfirmation}
          />
          <Route
            path="/arrivalToCprStationConfirmation/3"
            component={ArrivalToCprStationConfirmation}
          />
          <Route
            path="/arrivalToCprStationConfirmation/4"
            component={ArrivalToCprStationConfirmation}
          />
          <Route
            path="/arrivalToCprStationConfirmation/5"
            component={ArrivalToCprStationConfirmation}
          />
          <Route path="/vaccineConfirmation" component={VaccineConfirmation} />
          <Route path="/vaccine" component={VaccineWaitingRoom} />
          <Route path="/cpr" component={CPRWaitingRoom} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
