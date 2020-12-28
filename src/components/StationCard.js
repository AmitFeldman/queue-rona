import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {makeStyles} from '@material-ui/core';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import {CircularProgressbar} from 'react-circular-progressbar';
import {PERCENTAGE_DONE} from '../utils/soldier-util';

const stationColor = 'rgba(51, 52, 96)';
const ALERT_TIMEOUT = 3000;

const useStyles = makeStyles((theme) => ({
  '@keyframes blink': {
    '0%': {
      boxShadow: '0px 0px 25px 1px rgba(126,105,255,0.42)',
    },
    '50%': {
      boxShadow: '0px 0px 25px 8px rgba(126,105,255,0.42)',
    },
    '100%': {
      boxShadow: '0px 0px 25px 1px rgba(126,105,255,0.42)',
    },
  },
  blinkGlow: {
    animationName: '$blink',
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
}));

const StationCard = ({stageId, soldierId}) => {
  const {blinkGlow} = useStyles();
  const [alert, setAlert] = React.useState(false);
  // const timeDone = waintingPrecentage === PERCENTAGE_DONE;

  React.useEffect(() => {
    if (soldierId !== null) {
      setAlert(true);

      const timeoutId = setTimeout(() => {
        setAlert(false);
      }, ALERT_TIMEOUT);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [soldierId]);

  return (
    <Paper
      className={alert ? blinkGlow : ''}
      style={{
        height: '80%',
        width: '70%',
        margin: 'auto',
        backgroundColor: 'rgba(247, 247, 255)',
        borderRadius: '25px',
        borderTop: '2px solid rgb(212, 211, 216)',
        borderLeft: '2px solid rgb(212, 211, 216)',
        borderRight: '2px solid rgb(212, 211, 216)',
      }}>
      <Typography
        variant="h4"
        style={{
          height: '50%',
          color: stationColor,
        }}>
        {soldierId !== null ? soldierId : 'פנוי'}
      </Typography>
      <Typography
        style={{
          height: '50%',
          backgroundColor: stationColor,
          color: 'white',
          borderBottomLeftRadius: '25px',
          borderBottomRightRadius: '25px',
        }}
        variant="h6">
        {'לעמדה מספר ' + (stageId + 1)}
      </Typography>
    </Paper>
  );
};

export default StationCard;
