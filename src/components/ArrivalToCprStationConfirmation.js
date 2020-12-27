import React, {useEffect, useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import {
  Button,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
  createStyles,
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      backgroundColor: 'white',
      color: 'black',
      cursor: 'default',
      border: 'solid 1px lightGray',
      'border-radius': '5px',
      display: 'block',
      padding: '7px',
      textAlign: 'center',
      outline: '0',
      boxShadow: '0 0 0 0',
    },
    radio: {
      display: 'none',
    },
    radioBox: {
      backgroundColor: '#333460',
      cursor: 'default',
      border: 'solid 1px lightGray',
      'border-radius': '5px',
      display: 'block',
      padding: '7px',
      textAlign: 'center',
      outline: '0',
    },
  })
);

function ArrivalToCprStationConfirmation() {
  const {button} = useStyles();
  const {radio} = useStyles();
  const {radioBox} = useStyles();
  const [soldierId, setId] = React.useState('');
  const [wasArrived, setWasArrived] = React.useState('');
  const [isRadiosEnabled, setIsRadiosEnabled] = React.useState(true);
  const [isBusyWithSoldier, setIsBusyWithSoldier] = React.useState(false);
  let url = window.location.href;
  let stationId = url.substring(url.lastIndexOf('/') + 1);

  React.useEffect(() => {
    setInterval(() => {
      if (isBusyWithSoldier === false) {
        axios
          .get(
            'http://corona-server.azurewebsites.net/callNextSoldierToCprStation'
          )
          .then((res) => {
            setId(res.data);
            setIsBusyWithSoldier(true);
          })
          .catch((rej) => {
            setId('אין מתחסן קרוב בינתיים');
          });
      }
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (wasArrived !== '') giveArrivedResult();
  }, [wasArrived]);

  async function getArrivedResult() {
    const params = new URLSearchParams();
    let soldierIdInteger = parseInt(soldierId);
    let soldierIdWithoutZeroPrefix = soldierIdInteger.toString();
    let soldierJson = {
      soldierId: soldierIdWithoutZeroPrefix,
      wasArrivedToCprStation: wasArrived,
    };
    params.append('0', JSON.stringify(soldierJson));
    debugger;
    return await axios.put(
      `http://corona-server.azurewebsites.net/setWasArrivedToCprStation`,
      params
    );
  }

  function isInputValid() {
    return (
      (soldierId.length == 7 || soldierId.length == 8) && wasArrived !== ''
    );
  }

  function giveArrivedResult() {
    getArrivedResult()
      .then((res) => {
        alert(res.data.data);
      })
      .catch((rej) => {
        alert(JSON.stringify(rej));
      });
  }

  async function callNext() {
    const paramsCallNext = new URLSearchParams();
    let stationIdIntegerMinus1 = parseInt(stationId) - 1;
    let stationIdMinus1 = stationIdIntegerMinus1.toString();
    let cprStationJson = {
      cprStationId: stationIdMinus1,
    };
    paramsCallNext.append('0', JSON.stringify(cprStationJson));
    debugger;
    return await axios.put(
      `http://corona-server.azurewebsites.net/callNextSoldierToCprStation`,
      paramsCallNext
    );
  }

  function isCanCallNextSoldier() {
    return wasArrived !== '' && isBusyWithSoldier === true;
  }

  function callNextSoldier() {
    callNext()
      .then((res) => {
        alert(res.data.data);
      })
      .catch((rej) => {
        alert(JSON.stringify(rej));
      });
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{minHeight: '50vh'}}>
      <FormControl>
        <List>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              'font-size': '18px',
              paddingTop: '50px',
            }}>
            המתחסן הקרוב
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              padding: '0',
            }}></ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}>
            <TextField
              style={{
                'text-align': 'center',
              }}
              disabled="true"
              variant="outlined"
              value={soldierId}
              //onChange={(e) => setId(e?.target?.value)}
            />
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              'font-size': '18px',
              paddingTop: '80px',
            }}>
            האם המתחסן הגיע? (לא לשכוח לבצע אימות באמצעות חוגר){' '}
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top">
              <FormControlLabel
                className={radioBox}
                style={{
                  backgroundColor: wasArrived === false ? '#333460' : 'white',
                  color: wasArrived === false ? 'white' : 'black',
                }}
                tabindex="2"
                control={
                  <Radio
                    className={radio}
                    disabled={!isCanCallNextSoldier()}
                    color="primary"
                    checked={wasArrived === false}
                    onChange={() => {
                      setWasArrived(false);
                      setIsRadiosEnabled(false);
                      // giveArrivedResult()
                    }}
                  />
                }
                label="לא, דלג להבא בתור"
                labelPlacement="start"
              />
              <FormControlLabel
                className={radioBox}
                style={{
                  backgroundColor: wasArrived === true ? '#333460' : 'white',
                  color: wasArrived === true ? 'white' : 'black',
                }}
                tabindex="1"
                control={
                  <Radio
                    className={radio}
                    disabled={!isCanCallNextSoldier()}
                    color="primary"
                    checked={wasArrived === true}
                    onChange={() => {
                      setWasArrived(true);
                      setIsRadiosEnabled(false);
                    }}
                  />
                }
                label="כן, המתחסן הוזן במערכת"
                labelPlacement="start"
              />
            </RadioGroup>
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              paddingTop: '80px',
            }}>
            <Button
              variant="contained"
              disabled={!isCanCallNextSoldier()}
              className={button}
              color="primary"
              onClick={() => {
                setIsBusyWithSoldier(false);
              }}>
              קריאה להבא בתור
            </Button>
          </ListItem>
        </List>
      </FormControl>
    </Grid>
  );
}

export default ArrivalToCprStationConfirmation;
