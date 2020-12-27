import './App.css';
import React from 'react';
import AddAppointment from './components/AddAppointment';
import ArrivalToCprStationConfirmation from './components/ArrivalToCprStationConfirmation';
import VaccineConfirmation from './components/VaccineConfirmation';

import Container from '@material-ui/core/Container';
import {Route, Switch, useLocation} from 'react-router-dom';
import NavBar from './components/NavBar';
import VaccineWaitingRoom from './components/VaccineWaitingRoom';
import CPRWaitingRoom from './components/CPRWaitingRoom';
import FooterBar from './components/FooterBar';
import Home from './components/Home';

function App() {
  const location = useLocation();

  return (
    <div className="App Background">
      <NavBar />

      <Container disableGutters maxWidth="lg">
        <Switch>
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
          <Route path="/vaccineWait" component={VaccineWaitingRoom} />
          <Route path="/cprWait" component={CPRWaitingRoom} />
        </Switch>
      </Container>

      {!location.pathname.includes('Wait') && <FooterBar />}
    </div>
  );
}

export default App;
