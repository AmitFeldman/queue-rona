import React from 'react';
import {useSoldiers} from '../context/soldiers-context';
import {useStations} from '../context/stations-context';
import WaitingRoomLayout from './WaitingRoomLayout';
import Typography from '@material-ui/core/Typography';
import StationCard from './StationCard';
import SoldierCardWrapper from './SoldierCardWrapper';
import Grid from '@material-ui/core/Grid';
import {AiOutlineCloseCircle, AiOutlineCheckCircle} from 'react-icons/ai';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const PERCENTAGE_DONE = 100;

const SoldierCard = ({
  soldierId,
  waintingPrecentage,
  wasArrivedToCPRStation,
}) => {
  const cprDone = Boolean(wasArrivedToCPRStation);
  const done = waintingPrecentage === PERCENTAGE_DONE && cprDone;

  return (
    <SoldierCardWrapper greenBorder={done}>
      <Box height={1 / 2}>
        {done ? (
          <Typography variant="h6" style={{color: 'green'}}>
            רשאי ללכת <AiOutlineCheckCircle />
          </Typography>
        ) : (
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6">
                <CircularProgress
                  variant="determinate"
                  value={waintingPrecentage}
                  size={20}
                />
                זמן המתנה
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                style={{color: cprDone ? 'green' : 'red'}}>
                {cprDone ? <AiOutlineCheckCircle /> : <AiOutlineCloseCircle />}
                CPR
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
      <Box height={1 / 2}>
        <Typography variant="h5">{soldierId}</Typography>
      </Box>
    </SoldierCardWrapper>
  );
};

const CPRWaitingRoom = () => {
  const {cprSoldiers} = useSoldiers();
  const {vaccineStations} = useStations();

  return (
    <WaitingRoomLayout
      waitingHeader="סטטוס שחרור"
      nextHeader="הבאים בתור"
      stationHeader="לעמדת ה-CPR"
      soldiers={cprSoldiers.sort(({wasArrivedToCPRStation}) =>
        wasArrivedToCPRStation ? 1 : -1
      )}
      stations={vaccineStations}
      SoldierCard={SoldierCard}
      StationCard={StationCard}
    />
  );
};

export default CPRWaitingRoom;
