import React from 'react';
import axios from 'axios';
import {Grid, Paper, createStyles, Table} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {JsonToTable} from 'react-json-to-table';
import {DataGrid} from '@material-ui/data-grid';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  Crosshair,
} from 'react-vis';

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

// let myJson = JSON.parse(jsonData);

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
      `https://corona-server.azurewebsites.net/getAllVaccinatedSoldiersToday`
    );
  };

  const DATA = [
    [
      {x: 1, y: 10},
      {x: 2, y: 7},
      {x: 3, y: 15},
    ],
    [
      {x: 1, y: 20},
      {x: 2, y: 5},
      {x: 3, y: 15},
    ],
  ];

  let jsonData = {
    soldiers: [
      {
        soldierId: '8196713',
        vaccineTime: '2020-12-2BT21:23:14.000Z',
      },
      {
        soldierId: '8196713',
        vaccineTime: '2020-12-2BT21:23:14.000Z',
      },
    ],
  };
  const columns = [
    {field: 'soldierId', headerName: 'מספר אישי', width: 70},
    {field: 'vaccineTime', headerName: 'מתי התחסן', width: 130},
  ];

  const rows = jsonData.soldiers;
  return (
    <>
      <Grid
        container
        spacing={2}
        style={{marginTop: '1rem'}}
        className={center}>
        <Grid item xs={4} className={center}>
          {/* <ul>
                        {jsonData.soldiers.map(item => {
                            return <li>{item}</li>;
                        })}
                    </ul> */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </Grid>
        <Grid item xs={4} className={center}>
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
        <Grid item xs={4} className={center}>
          <Paper>
            <p>&nbsp;</p>
            <div style={{fontSize: '150%'}}>מספר האנשים שהתחסנו היום:</div>

            <p>&nbsp;</p>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Reports;
