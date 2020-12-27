import React from 'react';
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
  const [isBusyWithSoldier, setIsBusyWithSoldier] = React.useState(false);
  let url = window.location.href;
  let stationId = url.substring(url.lastIndexOf('/') + 1);

  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    const interval = setTimeout(() => {
      if (isBusyWithSoldier === false) {
        axios
          .put(
            `https://corona-server.azurewebsites.net/${stationId}/callNextSoldierToCprStation`,
            {headers: {'Content-Type': 'application/json'}}
          )
          .then((res) => {
            setIsBusyWithSoldier(true);
            setId(res.data);
          })
          .catch((rej) => {
            setId('אין מתחסן קרוב בינתיים');
          });
      }
      setCounter(counter + 1);
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (wasArrived !== '') giveArrivedResult();
  }, [wasArrived]);

  async function getArrivedResult() {
    let soldierIdInteger = parseInt(soldierId);
    let soldierIdWithoutZeroPrefix = soldierIdInteger.toString();
    let soldierJson = {
      soldierId: soldierIdWithoutZeroPrefix,
      wasArrivedToCprStation: wasArrived,
    };

    return await axios.put(
      `https://corona-server.azurewebsites.net/setWasArrivedToCprStation`,
      soldierJson
    );
  }

  function giveArrivedResult() {
    getArrivedResult()
      .then((res) => {
        window.location.reload(false);
      })
      .catch((rej) => {
        console.log(JSON.stringify(rej));
      });
  }

  function isCanCallNextSoldier() {
    return wasArrived !== '' && isBusyWithSoldier === true;
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
              inputProps={{style: {textAlign: 'center'}}}
              disabled="true"
              variant="outlined"
              value={soldierId}
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
                  backgroundColor: wasArrived === true ? '#333460' : 'white',
                  color: wasArrived === true ? 'white' : 'black',
                }}
                tabindex="1"
                control={
                  <Radio
                    className={radio}
                    disabled={!isBusyWithSoldier}
                    color="primary"
                    checked={wasArrived === true}
                    onChange={() => setWasArrived(true)}
                  />
                }
                label="כן, המתחסן הוזן במערכת"
                labelPlacement="start"
              />
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
                    disabled={!isBusyWithSoldier}
                    color="primary"
                    checked={wasArrived === false}
                    onChange={() => setWasArrived(false)}
                  />
                }
                label="לא, דלג להבא בתור"
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
