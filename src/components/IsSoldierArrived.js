import React, {useEffect, useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  List,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  createStyles,
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const RadioOptions = ({value, setValue}) => {
  return (
    <RadioGroup row aria-label="position" name="position" defaultValue="top">
      <FormControlLabel
        control={
          <Radio
            color="primary"
            checked={value === true}
            onChange={() => setValue(true)}
          />
        }
        label="כן"
        labelPlacement="start"
      />
      <FormControlLabel
        control={
          <Radio
            color="primary"
            checked={value === false}
            onChange={() => setValue(false)}
          />
        }
        label="לא"
        labelPlacement="start"
      />
    </RadioGroup>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      backgroundColor: 'gray',
    },
    radio: {
      display: 'none',
    },
    radioBox: {
      backgroundColor: 'white',
      cursor: 'default',
      border: 'solid 1px lightGray',
      display: 'block',
      padding: '7px',
      textAlign: 'center',
      border: 'solid 1px lightGray',
      outline: '0',
    },
  })
);

function VaccineConfirmation() {
  const {button} = useStyles();
  const {radio} = useStyles();
  const {radioBox} = useStyles();
  const [soldierId, setId] = React.useState('8215936');
  const [wasVaccinated, setWasVaccinated] = React.useState('');

  async function getResult() {
    const params = new URLSearchParams();
    let soldierIdInteger = parseInt(soldierId);
    let soldierIdWithoutZeroPrefix = soldierIdInteger.toString();
    let soldierJson = {
      soldierId: soldierIdWithoutZeroPrefix,
      wasVaccinated: wasVaccinated,
    };
    params.append('0', JSON.stringify(soldierJson));
    debugger;
    return await axios.post(
      `http://127.0.0.1:8080/${soldierIdWithoutZeroPrefix}/wasVaccinated`,
      params
    );
  }

  function isInputValid() {
    return (
      (soldierId.length == 7 || soldierId.length == 8) && wasVaccinated !== ''
    );
  }

  function give() {
    getResult()
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
              'font-weight': 'bold',
              'font-size': '18px',
            }}>
            מספר אישי{' '}
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}></ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}>
            <TextField
              disabled={true}
              id="filled-basic"
              label={soldierId}
              variant="filled"
            />
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              'font-weight': 'bold',
              'font-size': '18px',
            }}>
            האם החייל הגיע לעמדה?{' '}
          </ListItem>
          <ListItem>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top">
              <ListItem
                style={{
                  display: 'flex',
                  'justify-content': 'center',
                  'align-items': 'center',
                }}>
                <FormControlLabel
                  className={radioBox}
                  style={{
                    backgroundColor: wasVaccinated ? 'lightGray' : 'white',
                  }}
                  tabindex="1"
                  control={
                    <Radio
                      className={radio}
                      color="primary"
                      checked={wasVaccinated === true}
                      onChange={() => {
                        setWasVaccinated(true);
                      }}
                    />
                  }
                  label="בוצע אימות זיהוי"
                  labelPlacement="start"
                />
              </ListItem>
              <ListItem
                style={{
                  display: 'flex',
                  'justify-content': 'center',
                  'align-items': 'center',
                }}>
                <FormControlLabel
                  className={radioBox}
                  style={{
                    backgroundColor: wasVaccinated ? 'white' : 'lightGray',
                  }}
                  tabindex="2"
                  control={
                    <Radio
                      className={radio}
                      color="primary"
                      checked={wasVaccinated === false}
                      onChange={() => setWasVaccinated(false)}
                    />
                  }
                  label="לא בוצע אימות"
                  labelPlacement="start"
                />
              </ListItem>
            </RadioGroup>
          </ListItem>
        </List>

        <Button
          className={button}
          disabled={!isInputValid(soldierId)}
          variant="contained"
          color="primary"
          onClick={give}>
          שלח
        </Button>
      </FormControl>
    </Grid>
  );
}

export default VaccineConfirmation;
