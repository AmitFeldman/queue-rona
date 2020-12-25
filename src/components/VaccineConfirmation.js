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
} from '@material-ui/core';

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

function VaccineConfirmation() {
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

  function isInputValid(soldierId) {
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
      style={{minHeight: '100vh'}}>
      <Paper>
        <FormControl>
          <List>
            <ListItem>
              <TextField
                placeholder="מספר אישי"
                value={soldierId}
                onChange={(e) => setId(e?.target?.value)}
              />
            </ListItem>
            <ListItem>
              <FormLabel component="legend">האם התחסנת?</FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top">
                <FormControlLabel
                  control={
                    <Radio
                      color="primary"
                      checked={wasVaccinated === true}
                      onChange={() => setWasVaccinated(true)}
                    />
                  }
                  label="כן"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Radio
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
