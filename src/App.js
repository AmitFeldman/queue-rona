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
import FooterBar from './components/FooterBar';
import Home from './components/Home';

function App() {
  return (
    <div className="App Background">
      <NavBar />
      <Container disableGutters maxWidth="lg">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/addAppointment" component={AddAppointment} />
          <Route path="/soldierArrival" component={IsSoldierArrived} />
          <Route path="/vaccine" component={VaccineWaitingRoom} />
          <Route path="/cpr" component={CPRWaitingRoom} />
        </Switch>
      </Container>
      <FooterBar />
    </div>
  );
}

export default App;
