import './App.css';
import React from 'react';
import AddAppointment from './components/AddAppointment';
import IsSoldierArrived from './components/IsSoldierArrived';
import Container from '@material-ui/core/Container';
import {Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import VaccineWaitingRoom from './components/VaccineWaitingRoom';
import CPRWaitingRoom from './components/CPRWaitingRoom';

function App() {
  return (
    <div className="App">
      <NavBar />

      <br />

      <Container disableGutters maxWidth="lg">
        <Switch>
          <Route exact path="/" component={AddAppointment} />
          <Route path="/soldierArrival" component={IsSoldierArrived} />
          <Route path="/cpr" component={CPRWaitingRoom} />
          <Route path="/vaccine" component={VaccineWaitingRoom} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
