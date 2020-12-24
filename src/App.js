import './App.css';
import React from 'react';
import AddAppointment from './components/AddAppointment';
import Container from '@material-ui/core/Container';
import {Route, Switch} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Palmahim from './images/Bacha_30_Palmachim.png';
import AirForce from './images/Israeli_Air_Force.png';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ScheduleView from './components/ScheduleView';
import {Grid, makeStyles} from '@material-ui/core';

const Component3 = () => <div>3</div>;
const Component4 = () => <div>4</div>;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 0px',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  headline: {
    paddingTop: '2%',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <AppBar position="sticky">
        <Avatar alt="Palmahim" src={Palmahim} />
        <Typography variant="h6">
          ברוכים הבאים למרכז החיסונים בפלמחים
        </Typography>
      </AppBar>

      <Container>
        <Switch>
          <Route exact path="/" component={AddAppointment} />
          <Route path="/schedule" component={ScheduleView} />
          <Route path="/3" component={Component3} />
          <Route path="/4" component={Component4} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
