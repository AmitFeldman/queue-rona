import './App.css';
import React from 'react';
import AddAppointment from './components/AddAppointment';
import IsSoldierArrived from './components/IsSoldierArrived';
import Container from '@material-ui/core/Container';
import {Route, Switch} from 'react-router-dom';
import ScheduleView from './components/ScheduleView';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="Background">
        <Container>
          <Switch>
            <Route exact path="/" component={AddAppointment} />
            <Route path="/soldierArrival" component={IsSoldierArrived} />
            <Route path="/schedule" component={ScheduleView} />
          </Switch>
        </Container>
      </div>
    </div>
  );
}

export default App;
