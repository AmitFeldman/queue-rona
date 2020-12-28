import './App.css';
import React, {useEffect, useState} from 'react';
import AddAppointment from './components/AddAppointment';
import IsSoldierArrived from './components/IsSoldierArrived';
import ArrivalToCprStationConfirmation from './components/ArrivalToCprStationConfirmation';
import VaccineConfirmation from './components/VaccineConfirmation';

import Container from '@material-ui/core/Container';
import {Route, Switch, useLocation} from 'react-router-dom';
import NavBar from './components/NavBar';
import CanGetVaccinated from './components/CanGetVaccinated';
import VaccineWaitingRoom from './components/VaccineWaitingRoom';
import CPRWaitingRoom from './components/CPRWaitingRoom';
import FooterBar from './components/FooterBar';
import Home from './components/Home';
import Management from './components/Management';
import Dropzone from './components/Dropzone';
import {LastLocationProvider} from 'react-router-last-location';

function App() {
  const [user, setUser] = useState('');
  const authorizedUsers = ['coronapalmachim@gmail.com'];

  useEffect(
    () => {
      if (window.location.hostname === 'localhost') {
        setUser('coronapalmachim@gmail.com');
      } else {
        // GET request using fetch inside useEffect React hook
        fetch('/.auth/me')
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            data[0] ? setUser(data[0].user_id) : setUser('');
          });
      }
    },
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    []
  );

  const location = useLocation();

  const isValidUser = (userName) => {
    return authorizedUsers.includes(userName);
  };

  return !isValidUser(user) ? (
    <div>no valid user</div>
  ) : (
    <div className="App Background">
      <NavBar />

      <Container disableGutters maxWidth="lg">
        <Switch>
          <LastLocationProvider>
            <Route exact path="/" component={Home} />
            <Route path="/soldierArrival/1" component={IsSoldierArrived} />
            <Route path="/soldierArrival/2" component={IsSoldierArrived} />
            <Route path="/soldierArrival/3" component={IsSoldierArrived} />
            <Route path="/soldierArrival/4" component={IsSoldierArrived} />
            <Route path="/soldierArrival/5" component={IsSoldierArrived} />

            {/* <Route path="/schedule" component={ScheduleView} /> */}
            <Route path="/CanGetVaccinated" component={CanGetVaccinated} />
            <Route path="/addAppointment" component={AddAppointment} />
            <Route path="/management" component={Management} />
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
            <Route
              path="/vaccineConfirmation"
              component={VaccineConfirmation}
            />
            <Route path="/vaccineWait" component={VaccineWaitingRoom} />
            <Route path="/cprWait" component={CPRWaitingRoom} />
            <Route path="/dropzone" component={Dropzone} />
          </LastLocationProvider>
        </Switch>
      </Container>

      {!location.pathname.includes('Wait') && <FooterBar />}
    </div>
  );
}

export default App;
