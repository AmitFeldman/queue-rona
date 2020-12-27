import React from 'react';
import {useSoldiers} from '../context/soldiers-context';
import {useStations} from '../context/stations-context';
import WaitingRoomLayout from './WaitingRoomLayout';
import Typography from '@material-ui/core/Typography';
import StationCard from './StationCard';
import SoldierCardWrapper from './SoldierCardWrapper';

const SoldierCard = ({soldierId}) => {
  return (
    <SoldierCardWrapper>
      <Typography variant="h4">{soldierId}</Typography>
    </SoldierCardWrapper>
  );
};

const VaccineWaitingRoom = () => {
  const {vaccineSoldiers} = useSoldiers();
  const {vaccineStations} = useStations();

  return (
    <WaitingRoomLayout
      waitingHeader="סדר הממתינים"
      nextHeader="הבאים בתור"
      stationHeader="לעמדת התשאול"
      soldiers={vaccineSoldiers}
      stations={vaccineStations}
      SoldierCard={SoldierCard}
      StationCard={StationCard}
    />
  );
};

export default VaccineWaitingRoom;
