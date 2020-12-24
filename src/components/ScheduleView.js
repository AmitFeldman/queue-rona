import React from 'react';
import {Grid, Typography, Divider, ListItem, List} from '@material-ui/core';

const users = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
const stations = [
  {id: 1, name: 'A', currentUserId: 6},
  {id: 2, name: 'B', currentUserId: 8},
  {id: 3, name: 'C'},
];

const Title = ({text}) => {
  return (
    <>
      <Typography variant="h4">{text}</Typography>
      <Divider />
    </>
  );
};

const ScheduleView = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Title text={'תחנות'} />

        <List>
          {stations.map(({id, name, currentUserId}) => (
            <ListItem key={id}>
              <Typography>
                {name} - {currentUserId ? currentUserId : 'פנויה'}
              </Typography>
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
