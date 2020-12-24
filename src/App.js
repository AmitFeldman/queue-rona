import './App.css';
import React from 'react';
import AddAppointment from './components/AddAppointment';
import IsSoldierArrived from './components/IsSoldierArrived';
import Container from '@material-ui/core/Container';
import {Route, Switch} from 'react-router-dom';
import ScheduleView from './components/ScheduleView';
import NavBar from './components/NavBar';

const Component3 = () => <div>3</div>;
const Component4 = () => <div>4</div>;

function App() {
  return (
    <div className="App">
      <NavBar />

      <br />

      <Container>
        <Switch>
          <Route exact path="/" component={AddAppointment} />
          <Route path="/soldierArrival" component={IsSoldierArrived} />
          <Route path="/schedule" component={ScheduleView} />
          <Route path="/3" component={Component3} />
          <Route path="/4" component={Component4} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
