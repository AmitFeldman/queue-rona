import React from 'react';
import {Grid, makeStyles, Typography} from '@material-ui/core';
import {useUsers} from '../context/users-context';
import {useStations} from '../context/stations-context';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import Header from './Header';
import Station from './Station';

const USERS_PER_PAGE = 15;
const PAGE_INTERVAL_TIMEOUT = 3000;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  pagination: {
    justifyContent: 'center',
  },
}));

const ScheduleView = () => {
  const {users} = useUsers();
  const {stations} = useStations();
  const [page, setPage] = React.useState(1);
  const {root, pagination} = useStyles();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setPage((p) => {
        const pagesCount = Math.ceil(users.length / USERS_PER_PAGE);
        return p < pagesCount ? p + 1 : 1;
      });
    }, PAGE_INTERVAL_TIMEOUT);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Header text={'תחנות'} />

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
        <Header text={'ממתינים בתור'} />

        <Box height="70vh">
          <Grid className={root} container direction="column" spacing={1}>
            {users
              .slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE)
              .map(({id}) => (
                <Grid item key={id}>
                  <Paper>
                    <Box p={1}>
                      <Typography variant="h4">{id}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
          </Grid>

          <Pagination
            classes={{ul: pagination}}
            count={Math.ceil(users.length / USERS_PER_PAGE)}
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
