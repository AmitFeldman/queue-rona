import React, {useEffect} from 'react';
import {Grid, Typography, Divider, makeStyles} from '@material-ui/core';
import {useUsers} from '../context/users-context';
import {useStations} from '../context/stations-context';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';

const USERS_PER_PAGE = 15;

const Title = ({text}) => {
  return (
    <>
      <Typography variant="h4">{text}</Typography>
      <Divider />
      <br />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  pagination: {
    justifyContent: 'center',
  },
}));

const Station = ({name, current}) => {
  useEffect(() => {
    if (current !== undefined) {
      console.log('WOAH');
    }
  }, [current]);

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h6">
          {current !== undefined ? current + 'חייל בעמדה' : 'העמדה פנויה'}
        </Typography>
      </Box>
    </Paper>
  );
};

const ScheduleView = () => {
  const {users} = useUsers();
  const {stations} = useStations();
  const [page, setPage] = React.useState(1);
  const {root, pagination} = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Title text={'תחנות'} />

        <Box height="70vh">
          <Grid
            container
            className={root}
            direction="column"
            spacing={2}
            xs={6}>
            {stations.map(({id, name, current}) => (
              <Grid item key={id}>
                <Station name={name} current={current} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={8}>
        <Title text={'ממתינים בתור'} />

        <Box height="70vh">
          <Grid className={root} container direction="column" spacing={1}>
            {users
              .slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE)
              .map(({id}) => (
                <Grid item key={id}>
                  <Paper>
                    <Box p={1}>
                      <Typography>{id}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
          </Grid>

          <Pagination
            classes={{ul: pagination}}
            count={Math.floor(users.length / USERS_PER_PAGE)}
            variant="outlined"
            page={page}
            onChange={(e, p) => setPage(p)}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ScheduleView;
