import './App.css';
import React from 'react';
import AddAppointment from './components/AddAppointment';
import IsSoldierArrived from './components/IsSoldierArrived';
import ArrivalToCprStationConfirmation from './components/ArrivalToCprStationConfirmation';
import VaccineConfirmation from './components/VaccineConfirmation';

import Container from '@material-ui/core/Container';
import {Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import CanGetVaccinated from './components/CanGetVaccinated';
import VaccineWaitingRoom from './components/VaccineWaitingRoom';
import CPRWaitingRoom from './components/CPRWaitingRoom';
import FooterBar from './components/FooterBar';
import Home from './components/Home';

function App() {
  return (
    <div className="App Background">
      <NavBar />

      <Container disableGutters maxWidth="lg">
        <Switch>
          <Route exact path="/" component={AddAppointment} />
          <Route path="/soldierArrival/1" component={IsSoldierArrived} />
          <Route path="/soldierArrival/2" component={IsSoldierArrived} />
          <Route path="/soldierArrival/3" component={IsSoldierArrived} />
          <Route path="/soldierArrival/4" component={IsSoldierArrived} />
          <Route path="/soldierArrival/5" component={IsSoldierArrived} />
          {/* <Route path="/schedule" component={ScheduleView} /> */}
          <Route path="/CanGetVaccinated" component={CanGetVaccinated} />
          <Route exact path="/" component={Home} />
          <Route path="/addAppointment" component={AddAppointment} />
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
      <FooterBar />
    </div>
  );
}

export default App;
