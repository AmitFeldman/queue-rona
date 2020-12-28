import React from 'react';
import axios from 'axios';
import {Grid, Paper, createStyles} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {VictoryLine, VictoryTooltip, VictoryChart, VictoryAxis} from 'victory';

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
  const [vaccinatedSoldiers, setVaccinatedSoldiers] = React.useState([{}]);

  async function getVaccinatedCount() {
    setTimeout(() => getVaccinatedCount(), 5000);
    const result = await soldiersVaccinatedToday();
    setVaccinatedCount(result.data.count);
  }

  async function getVaccinatedSoldiers() {
    setTimeout(() => getVaccinatedSoldiers(), 5000);
    const result = await getAllVaccinatedSoldiersToday();
    let soldiers = result.data.soldiers;
    let i = 1;
    soldiers = soldiers.map((x) => {
      let date = new Date(x.vaccineTime);
      let currentHours = date.getHours();
      currentHours = ('0' + currentHours).slice(-2);
      let currentMinutes = date.getMinutes();
      currentMinutes = ('0' + currentMinutes).slice(-2);
      x.x = `${currentHours}:${currentMinutes}`;
      x.y = i;
      i++;
      x.label = [`מספר אישי: ${x.soldierId}`, `שעת חיסון: ${x.x}`];
      return x;
    });
    setVaccinatedSoldiers(soldiers);
  }

  React.useState(() => {
    setTimeout(() => getVaccinatedCount(), 500);
    setTimeout(() => getVaccinatedSoldiers(), 500);
  }, []);

  const soldiersVaccinatedToday = async () => {
    return await axios.get(
      `https://corona-server.azurewebsites.net/soldiersVaccinatedToday`
    );
  };

  const getAllVaccinatedSoldiersToday = async () => {
    return await axios.get(
      `https://corona-server.azurewebsites.net/getAllVaccinatedSoldiersToday`
    );
  };
  //   const xDomain = ["07:00", "08:00", "09:00", "10:00", "11:00" ,"12:00" ,"13:00" ,"14:00" ,"15:00" ,"16:00" ,"17:00" ,"18:00" ,"19:00"];

  function getY() {
    const result = [];
    for (let i = 1; i <= vaccinatedSoldiers.length; i = i + 1) {
      result.push(i);
    }

    return result;
  }
  return (
    <>
      <Grid
        container
        spacing={2}
        style={{marginTop: '1rem'}}
        className={center}>
        <Grid item xs={6} className={center}>
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
        <Grid item xs={6} className={center}>
          <Paper>
            <p>&nbsp;</p>
            <div style={{fontSize: '150%'}}>גרף חיסונים:</div>
            <VictoryChart height={1500} width={2000}>
              <VictoryAxis
                tickValues={[
                  '07',
                  '08',
                  '09',
                  '10',
                  '11',
                  '12',
                  '13',
                  '14',
                  '15',
                  '16',
                  '17',
                  '18',
                ]}
                tickFormat={(x) => `${x}:00`}
                style={{tickLabels: {fontSize: 40}}}
              />
              <VictoryAxis
                dependentAxis
                tickValues={getY()}
                tickFormat={(y) => y}
                style={{tickLabels: {fontSize: 50}}}
                fixLabelOverlap={true}
              />
              <VictoryLine
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{fill: 'black', stroke: 'whitesmoke'}}
                    horizontal={true}
                  />
                }
                data={vaccinatedSoldiers}
                style={{
                  data: {stroke: '#00008b'},
                }}
              />
            </VictoryChart>
            <p>&nbsp;</p>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Reports;