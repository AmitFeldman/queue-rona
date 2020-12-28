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
import {CircularProgressbar} from 'react-circular-progressbar';
import {makeStyles} from '@material-ui/core';
import 'react-circular-progressbar/dist/styles.css';
import {isSoldierDone, PERCENTAGE_DONE} from '../utils/soldier-util';
import {ImCheckboxChecked, ImCheckboxUnchecked} from 'react-icons/im';

const TOTAL_MINUTES = 15;

const useStyles = makeStyles(() => ({
  svg: {
    verticalAlign: 'middle',
    marginRight: '5%',
  },
}));

const SoldierCard = ({
  soldierId,
  waintingPrecentage,
  wasArrivedToCPRStation,
}) => {
  const {svg} = useStyles();
  const cprDone = Boolean(wasArrivedToCPRStation);
  const timeDone = waintingPrecentage === PERCENTAGE_DONE;
  const done = timeDone && cprDone;
  const totalTime =
    TOTAL_MINUTES -
    Math.floor((waintingPrecentage / PERCENTAGE_DONE) * TOTAL_MINUTES);

  return (
    <SoldierCardWrapper greenBorder={done}>
      <Box height={1 / 2}>
        {done ? (
          <Typography variant="h6" style={{color: 'green'}}>
            רשאי ללכת <AiOutlineCheckCircle className={svg} />
          </Typography>
        ) : (
          <Grid container>
            <Grid item xs={7}>
              <Typography
                variant="h6"
                style={{color: timeDone ? 'green' : 'black'}}>
                {timeDone ? (
                  <AiOutlineCheckCircle className={svg} />
                ) : (
                  <CircularProgressbar
                    value={totalTime}
                    minValue={0}
                    maxValue={15}
                    text={totalTime}
                    styles={{
                      root: {
                        width: '20px',
                        marginLeft: '5%',
                      },
                      text: {
                        fontSize: '60px',
                        fontWeight: 'bold',
                      },
                    }}
                  />
                )}
                זמן המתנה
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h6"
                style={{color: cprDone ? '#5D945C' : '#848484'}}>
                CPR
                {cprDone ? (
                  <ImCheckboxChecked
                    className={svg}
                    fontSize="small"
                    style={{marginRight: '5%'}}
                  />
                ) : (
                  <ImCheckboxUnchecked
                    className={svg}
                    fontSize="small"
                    style={{marginRight: '5%'}}
                  />
                )}
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
  const {cprStations} = useStations();

  const notDoneSoldiers = cprSoldiers.filter((s) => !isSoldierDone(s));
  const nextSoldiers = notDoneSoldiers
    .filter(({wasArrivedToCPRStation}) => !wasArrivedToCPRStation)
    .slice(0, 5);

  return (
    <WaitingRoomLayout
      waitingHeader="עמדת המתנה"
      nextHeader="הבאים בתור ל-CPR"
      stationHeader="לעמדת ה-CPR"
      footerHeader="משוחררים"
      soldiers={notDoneSoldiers.filter(
        ({soldierId: id}) =>
          nextSoldiers.find(({soldierId}) => soldierId === id) === undefined
      )}
      nextSoldiers={nextSoldiers}
      doneSoldiers={cprSoldiers.filter((s) => isSoldierDone(s))}
      stations={cprStations}
      SoldierCard={SoldierCard}
      StationCard={StationCard}
    />
  );
};

export default CPRWaitingRoom;
