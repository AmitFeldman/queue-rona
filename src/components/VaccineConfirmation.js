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
      width: '70px',
      display: 'block',
      textAlign: 'center',
      '&:click': {
        border: 'solid 1px lightGray',
        background: 'lightGray',
        outline: '0',
      },
      '&:hover': {
        backgroundColor: 'lightGray',
      },
      '&:focus': {
        border: 'solid 1px lightGray',
        background: 'lightGray',
        outline: '0',
      },
    },
  })
);

function VaccineConfirmation() {
  const {button} = useStyles();
  const {radio} = useStyles();
  const {radioBox} = useStyles();
  const [soldierId, setId] = React.useState('');
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
      <Paper>
        <FormControl>
          <List>
            <ListItem
              style={{
                display: 'flex',
                'justify-content': 'center',
                'align-items': 'center',
              }}>
              הזן מספר אישי
            </ListItem>
            <ListItem
              style={{
                display: 'flex',
                'justify-content': 'center',
                'align-items': 'center',
              }}>
              <TextField
                variant="outlined"
                value={soldierId}
                onChange={(e) => setId(e?.target?.value)}
              />
            </ListItem>
            <ListItem
              style={{
                display: 'flex',
                'justify-content': 'center',
                'align-items': 'center',
              }}>
              <FormLabel component="legend">האם התחסנת?</FormLabel>
            </ListItem>
            <ListItem
              style={{
                display: 'flex',
                'justify-content': 'right',
                'align-items': 'center',
                'margin-right': '20px',
              }}>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top">
                <FormControlLabel
                  className={radioBox}
                  tabindex="1"
                  control={
                    <Radio
                      className={radio}
                      color="primary"
                      checked={wasVaccinated === true}
                      onChange={() => setWasVaccinated(true)}
                    />
                  }
                  label="כן"
                  labelPlacement="start"
                />
                <FormControlLabel
                  className={radioBox}
                  tabindex="2"
                  control={
                    <Radio
                      className={radio}
                      color="primary"
                      checked={wasVaccinated === false}
                      onChange={() => setWasVaccinated(false)}
                    />
                  }
                  label="לא"
                  labelPlacement="start"
                />
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
      </Paper>
    </Grid>
  );
}

export default VaccineConfirmation;
