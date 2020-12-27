import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core';
import Ofek from '../images/OfekLogo.png';
import Matnam from '../images/MatnamLogo.png';

const useStyles = makeStyles((theme) =>
  createStyles({
    bar: {
      position: 'absolute',
      width: '100%',
      height: '10vh',
      bottom: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

const FooterBar = () => {
  const {bar} = useStyles();

  return (
    <div className={bar}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '300px',
        }}>
        <img width="80" alt="logo" src={Ofek} />
        <h3>מערכת הספקי חיסון</h3>
        <img alt="Matnam" width="60" src={Matnam} />
      </div>
    </div>
  );
};

export default FooterBar;
