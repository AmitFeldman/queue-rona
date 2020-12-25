import React from 'react';
import {useStations} from '../context/stations-context';
import WaitingRoomLayout from './WaitingRoomLayout';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Station from './Station';
import Typography from '@material-ui/core/Typography';
import {LinearProgress} from '@material-ui/core';
import {useUsers} from '../context/users-context';

const CPRWaitingRoom = () => {
  const {users} = useUsers();
  const {stations} = useStations();

  return (
    <WaitingRoomLayout
      waitingRoomHeader={'אזור ממתינים'}
      stationsHeader={'לעמדת הסיום'}
      users={users}
      stations={stations}
      UserComponent={({id}) => (
        <Paper>
          <Box p={1}>
            <Typography variant="h4">{id}</Typography>
            <LinearProgress value={20} variant="determinate" />
          </Box>
        </Paper>
      )}
      StationComponent={Station}
    />
  );
};

export default CPRWaitingRoom;
