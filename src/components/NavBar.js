import React from 'react';
import Palmahim from '../images/Bacha_30_Palmachim.png';
import AirForce from '../images/AirForceLogo.png';
import AppBar from '@material-ui/core/AppBar';
import {createStyles, Grid, makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>
  createStyles({
    bar: {
      padding: '10px 0',
      textAlign: '-webkit-center',
      backgroundColor: '#FAFAFA',
    },
    image: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  })
);

const NavBar = () => {
  const {bar, image} = useStyles();

  return (
    <>
      <AppBar position="sticky" className={bar}>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Avatar
              alt="AirForce"
              variant="square"
              src={AirForce}
              className={image}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography style={{color: 'black'}} variant="h4">
              מרכז החיסונים החיילי בפלמחים
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Avatar alt="Palmahim" src={Palmahim} className={image} />
          </Grid>
        </Grid>
        <Grid></Grid>
      </AppBar>
    </>
  );
};

export default NavBar;
