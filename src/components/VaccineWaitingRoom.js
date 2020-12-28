import React from 'react';
import {useSoldiers} from '../context/soldiers-context';
import {useStations} from '../context/stations-context';
import WaitingRoomLayout from './WaitingRoomLayout';
import Typography from '@material-ui/core/Typography';
import StationCard from './StationCard';
import SoldierCardWrapper from './SoldierCardWrapper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {createStyles} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    cardContainer: {
      display: 'flex',
      height: '100%',
    },
    text: {
      margin: 'auto',
    },
  })
);

const SoldierCard = ({soldierId}) => {
  const {cardContainer, text} = useStyles();

  return (
    <SoldierCardWrapper>
      <div className={cardContainer}>
        <Typography variant="h4" className={text}>
          {soldierId}
        </Typography>
      </div>
    </SoldierCardWrapper>
  );
};

const VaccineWaitingRoom = () => {
  const {vaccineSoldiers} = useSoldiers();
  const {vaccineStations} = useStations();

  const notVaccinatedSoldiers = vaccineSoldiers.filter(
    (s) => !s.soldier.wasVaccinated
  );

  return (
    <WaitingRoomLayout
      waitingHeader="סדר הממתינים"
      nextHeader="הבאים בתור"
      stationHeader="לעמדת התשאול"
      footerHeader="מחוסנים"
      soldiers={notVaccinatedSoldiers.slice(5)}
      nextSoldiers={notVaccinatedSoldiers.slice(0, 5)}
      doneSoldiers={vaccineSoldiers.filter((s) => s.soldier.wasVaccinated)}
      stations={vaccineStations}
      SoldierCard={SoldierCard}
      StationCard={StationCard}
    />
  );
};

export default VaccineWaitingRoom;
