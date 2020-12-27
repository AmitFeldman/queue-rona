import './App.css';
import React from 'react';
import AddAppointment from './components/AddAppointment';
import IsSoldierArrived from './components/IsSoldierArrived';
import Container from '@material-ui/core/Container';
import {Route, Switch} from 'react-router-dom';
import ScheduleView from './components/ScheduleView';
import NavBar from './components/NavBar';
import CanGetVaccinated from './components/CanGetVaccinated';
function App() {
  return (
    <div className="App">
      <NavBar />

      <br />

      <Container>
        <Switch>
          <Route exact path="/" component={AddAppointment} />
          <Route path="/soldierArrival/1" component={IsSoldierArrived} />
          <Route path="/soldierArrival/2" component={IsSoldierArrived} />
          <Route path="/soldierArrival/3" component={IsSoldierArrived} />
          <Route path="/soldierArrival/4" component={IsSoldierArrived} />
          <Route path="/soldierArrival/5" component={IsSoldierArrived} />
          <Route path="/schedule" component={ScheduleView} />
          <Route path="/CanGetVaccinated" component={CanGetVaccinated} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
