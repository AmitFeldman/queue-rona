import React from 'react';
import axios from 'axios';
import {Grid, Paper, createStyles} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() =>
  createStyles({
    center: {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      textAlign: 'center',
    },
  })
);

function Reports() {
  const {center} = useStyles();
  const [vaccinatedCount, setVaccinatedCount] = React.useState('');

  async function getVaccinatedCount() {
    setTimeout(() => getVaccinatedCount(), 5000);
    const result = await soldiersVaccinatedToday();
    setVaccinatedCount(result.data.count);
  }
  React.useState(() => {
    setTimeout(() => getVaccinatedCount(), 500);
  }, []);
  const soldiersVaccinatedToday = async () => {
    return await axios.get(
      `https://corona-server.azurewebsites.net/soldiersVaccinatedToday`
    );
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{marginTop: '1rem'}}
        className={center}>
        <Grid item xs={4}>
          <Paper style={{width: '20rem'}}>
            <p>&nbsp;</p>
            <div style={{fontSize: '150%'}}>מספר האנשים שהתחסנו היום:</div>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '300%',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}>
              {vaccinatedCount}
            </div>
            <p>&nbsp;</p>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Reports;
