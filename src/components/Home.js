import React from 'react';
import {useHistory} from 'react-router-dom';
import {createStyles, Grid, makeStyles, Paper} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      cursor: 'pointer',
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleOnClick = (url) => history.push(url);
  return (
    <div style={{marginTop: '5rem'}}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => handleOnClick('addAppointment')}>
            עמדת קליטה
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => handleOnClick('vaccineConfirmation')}>
            עמדת "ההתחסנת?"
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => handleOnClick('vaccineWait')}>
            מסך ממתינים לתשאול
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => handleOnClick('cprWait')}>
            מסך ממתינים לCPR
          </Paper>
        </Grid>
      </Grid>
      <div style={{marginTop: '2rem'}}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper
              className={classes.paper}
              onClick={() => handleOnClick('/soldierArrival/1')}>
              עמדת תשאול 1
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper
              className={classes.paper}
              onClick={() => handleOnClick('/soldierArrival/2')}>
              עמדת תשאול 2
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper
              className={classes.paper}
              onClick={() => handleOnClick('/soldierArrival/3')}>
              עמדת תשאול 3
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper
              className={classes.paper}
              onClick={() => handleOnClick('/soldierArrival/4')}>
              עמדת תשאול 4
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper
              className={classes.paper}
              onClick={() => handleOnClick('/soldierArrival/5')}>
              עמדת תשאול 5
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div style={{marginTop: '2rem'}}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper
              className={classes.paper}
              onClick={() =>
                handleOnClick('/ArrivalToCprStationConfirmation/1')
              }>
              <div>עמדת הזנה בCPR</div>
              <div>1</div>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper
              className={classes.paper}
              onClick={() =>
                handleOnClick('/ArrivalToCprStationConfirmation/2')
              }>
              <div>עמדת הזנה בCPR</div>
              <div>2</div>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper
              className={classes.paper}
              onClick={() =>
                handleOnClick('/ArrivalToCprStationConfirmation/3')
              }>
              <div>עמדת הזנה בCPR</div>
              <div>3</div>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper
              className={classes.paper}
              onClick={() =>
                handleOnClick('/ArrivalToCprStationConfirmation/4')
              }>
              <div>עמדת הזנה בCPR</div>
              <div>4</div>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper
              className={classes.paper}
              onClick={() =>
                handleOnClick('/ArrivalToCprStationConfirmation/5')
              }>
              <div>עמדת הזנה בCPR</div>
              <div>5</div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
