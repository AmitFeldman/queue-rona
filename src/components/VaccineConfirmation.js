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
      outline: '0',
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
      wasVaccinated: wasVaccinated,
    };
    params.append('0', JSON.stringify(soldierJson));
    return await axios.put(
      `https://corona-server.azurewebsites.net/${soldierIdWithoutZeroPrefix}/was_vaccinated`,
      soldierJson,
      {headers: {'Content-Type': 'application/json'}}
    );
  }

  function isInputValid() {
    return (
      (soldierId.length === 7 || soldierId.length === 8) && wasVaccinated !== ''
    );
  }

  function give() {
    getResult()
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((rej) => {
        console.log(JSON.stringify(rej));
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
              paddingTop: '50px',
            }}>
            יש לסרוק את הברקוד המופיע על החוגר
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}>
            במקרה של תקלה ניתן להזין מספר אישי
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}>
            <TextField
              error={soldierId.length < 7 || soldierId.length > 8}
              variant="outlined"
              inputProps={{
                maxLength: '8',
              }}
              value={soldierId}
              onChange={(e) => {
                const value = e?.target?.value;
                if (
                  value.length === 0 ||
                  (value[value.length - 1] >= '0' &&
                    value[value.length - 1] <= '9')
                ) {
                  setId(e?.target?.value);
                }
              }}
            />
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              paddingTop: '30px',
            }}>
            האם החייל התחסן?
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              padding: 0,
            }}>
            <RadioGroup
              style={{width: '100%', display: 'flex', justifyContent: 'center'}}
              row
              aria-label="position"
              name="position"
              defaultValue="top">
              <FormControlLabel
                className={radioBox}
                style={{
                  backgroundColor:
                    wasVaccinated === true ? 'lightGray' : 'white',
                  marginRight: 0,
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
                label="✔️ כן, התחסן"
                labelPlacement="start"
              />
              <FormControlLabel
                className={radioBox}
                style={{
                  backgroundColor:
                    wasVaccinated === false ? 'lightGray' : 'white',
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
                label="❌ לא, משהו השתבש"
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
    </Grid>
  );
}

export default VaccineConfirmation;
