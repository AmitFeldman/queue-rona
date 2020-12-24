import './App.css';
import React from 'react';
import AddAppointment from './components/AddAppointment';
import IsSoldierArrived from './components/IsSoldierArrived';
import Container from '@material-ui/core/Container';
import {Route, Switch} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Palmahim from './Bacha_30_Palmachim.png';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const Component2 = () => <div>2</div>;
const Component3 = () => <div>3</div>;
const Component4 = () => <div>4</div>;

function App() {
  return (
    <div className="App">
      <Container>
        <Switch>
          <div>
            <AppBar>
              <Avatar alt="Palmahim" src={Palmahim} />
              <Typography variant="h6">
                ברוכים הבאים למרכז החיסונים בפלמחים
              </Typography>
            </AppBar>

            <Route exact path="/" component={AddAppointment} />
            <Route path="/1" component={IsSoldierArrived} />
            <Route path="/2" component={Component2} />
            <Route path="/3" component={Component3} />
            <Route path="/4" component={Component4} />
          </div>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
