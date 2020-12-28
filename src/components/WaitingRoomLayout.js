import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';

const ITEMS_PER_PAGE = 10;
const ITEMS_PER_DONE_PAGE = 4;
const CAROUSEL_TIMEOUT = 4000;

const useStyles = makeStyles((theme) => ({
  footer: {
    height: '15vh',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  waitingCol: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  nextCol: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.025)',
  },
  stationCol: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  pagination: {
    justifyContent: 'center',
  },
}));

const ColumnHeaderWrapper = ({header, children}) => {
  return (
    <Grid item container direction="column" style={{height: '100%'}}>
      <Grid item style={{height: '8%'}}>
        <Typography variant="h4">{header}</Typography>
      </Grid>
      <Grid item style={{height: '92%'}}>
        {children}
      </Grid>
    </Grid>
  );
};

const useAutoPagination = (pageCount, timeout) => {
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setPage((currPage) => {
        return currPage < pageCount ? currPage + 1 : 1;
      });
    }, timeout);

    return () => {
      clearInterval(intervalId);
    };
  }, [pageCount, timeout]);

  return [page, setPage];
};

const calcPageCount = (itemCount, itemsPerPage) =>
  Math.ceil(itemCount / itemsPerPage);

const WaitingRoomLayout = ({
  waitingHeader,
  nextHeader,
  stationHeader,
  footerHeader,
  noFooter = false,
  soldiers,
  nextSoldiers,
  doneSoldiers = [],
  stations,
  SoldierCard,
  StationCard,
}) => {
  const {waitingCol, nextCol, stationCol, pagination, footer} = useStyles();
  const pageCount = calcPageCount(soldiers.length, ITEMS_PER_PAGE);
  const [page, setPage] = useAutoPagination(pageCount, CAROUSEL_TIMEOUT);

  const donePageCount = calcPageCount(doneSoldiers.length, ITEMS_PER_DONE_PAGE);
  const [donePage] = useAutoPagination(donePageCount, CAROUSEL_TIMEOUT);

  return (
    <>
      <Grid container style={{height: noFooter ? '85vh' : '70vh'}}>
        {/*Waiting Room*/}
        <Grid item container className={waitingCol} xs={6}>
          <ColumnHeaderWrapper header={waitingHeader}>
            <Grid container direction="column" style={{height: '92%'}}>
              {soldiers
                .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
                .map((soldier) => (
                  <Grid item key={soldier.soldierId} style={{height: '20%'}}>
                    <SoldierCard {...soldier} />
                  </Grid>
                ))}
            </Grid>

            <Pagination
              classes={{ul: pagination}}
              page={page}
              count={pageCount}
              variant="outlined"
              onChange={(_, p) => setPage(p)}
            />
          </ColumnHeaderWrapper>
        </Grid>

        {/*Next Up*/}
        <Grid item container className={nextCol} xs={3}>
          <ColumnHeaderWrapper header={nextHeader}>
            <Grid container direction="column" style={{height: '100%'}}>
              {nextSoldiers.map((soldier) => (
                <Grid item key={soldier.soldierId} style={{height: '20%'}}>
                  <SoldierCard {...soldier} />
                </Grid>
              ))}
            </Grid>
          </ColumnHeaderWrapper>
        </Grid>

        {/*Stations*/}
        <Grid item container className={stationCol} xs={3}>
          <ColumnHeaderWrapper header={stationHeader}>
            <Grid container direction="column" style={{height: '100%'}}>
              {stations.map((station) => (
                <Grid item key={station.stageId} style={{height: '20%'}}>
                  <StationCard {...station} />
                </Grid>
              ))}
            </Grid>
          </ColumnHeaderWrapper>
        </Grid>
      </Grid>

      {!noFooter && (
        <Grid container className={footer}>
          <Grid item xs={2}>
            <Typography variant="h4">{footerHeader}</Typography>
          </Grid>

          <Grid
            item
            container
            xs={10}
            spacing={2}
            alignContent="center"
            justify="center">
            {doneSoldiers
              .slice(
                (donePage - 1) * ITEMS_PER_DONE_PAGE,
                donePage * ITEMS_PER_DONE_PAGE
              )
              .map((soldier) => (
                <Grid item xs={3} key={soldier.soldierId}>
                  <Box p={2}>
                    <SoldierCard {...soldier} />
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default WaitingRoomLayout;
