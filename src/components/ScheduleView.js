import React, {useEffect} from 'react';
import {Grid, Typography, Divider, ListItem, List} from '@material-ui/core';
import {useUsers} from '../context/users-context';
import {useStations} from '../context/stations-context';

const Title = ({text}) => {
  return (
    <>
      <Typography variant="h4">{text}</Typography>
      <Divider />
    </>
  );
};

const Station = ({name, current}) => {
  useEffect(() => {
    if (current !== undefined) {
      console.log('WOAH');
    }
  }, [current]);

  return (
    <Typography>
      {name} - {current ? current : 'פנויה'}
    </Typography>
  );
};

const ScheduleView = () => {
  const {users} = useUsers();
  const {stations} = useStations();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Title text={'תחנות'} />

        <List>
          {stations.map(({id, name, current}) => (
            <ListItem key={id}>
              <Station name={name} current={current} />
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid item xs={8}>
        <Title text={'ממתינים בתור'} />

        <List>
          {users.map(({id}) => (
            <ListItem key={id}>
              <Typography>{id}</Typography>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ScheduleView;
