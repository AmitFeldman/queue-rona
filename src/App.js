import './App.css';
import React from 'react';
import AddAppointment from './components/AddAppointment';
import IsSoldierArrived from './components/IsSoldierArrived';
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
          <Route path="/soldierArrival" component={IsSoldierArrived} />
          <Route path="/vaccineConfirmation" component={VaccineConfirmation} />
          <Route path="/vaccine" component={VaccineWaitingRoom} />
          <Route path="/cpr" component={CPRWaitingRoom} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
