import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import {
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  createStyles,
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const CoolButton = ({text, action, isDisabled}) => {
  const {button} = useStyles();
  return (
    <Button
      className={button}
      style={{backgroundColor: 'white', width: '10rem', height: '3rem'}}
      variant="outlined"
      color="default"
      disabled={isDisabled}
      onClick={() => {
        action();
      }}>
      {text}
    </Button>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    center: {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      textAlign: 'center',
    },
    bold: {
      'font-weight': 'bold',
    },
    text: {
      '& .MuiInputBase-input': {
        backgroundColor: 'white !important',
        fontSize: '110%',
        textAlign: 'center',
        width: '7rem',
      },
    },
    fullWidth: {
      width: '100%',
    },
  })
);

function Management() {
  const {center, fullWidth, text, bold} = useStyles();
  const [soldierId, setId] = React.useState('');

  function isValid() {
    return soldierId.length === 7;
  }

  const deleteSoldier = async () => {
    return await axios.put(`http://localhost:8080/deleteSoldier/${soldierId}`);
  };

  return (
    <div>
      <FormControl>
        <List>
          <ListItem>
            <label
              className={center + ' ' + fullWidth}
              style={{fontSize: '120%'}}>
              הכנס מספר אישי
            </label>
          </ListItem>
          <div className={fullWidth}>
            <TextField
              size={'small'}
              inputProps={{
                maxLength: 7,
              }}
              error={soldierId.length !== 7}
              className={center + ' ' + text}
              variant="outlined"
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
          </div>
          <Grid container spacing={2} style={{marginTop: '1rem'}}>
            <Grid item xs={4}>
              <CoolButton
                text="חזרה לקליטה"
                action={() => {
                  if (isValid()) {
                    deleteSoldier();
                  }
                }}
                isDisabled={!isValid()}
              />
            </Grid>
            <Grid item xs={4}>
              <CoolButton
                text="התחסן ורשם שלא"
                action={() => {
                  if (isValid()) {
                  }
                }}
                isDisabled={!isValid()}
              />
            </Grid>
            <Grid item xs={4}>
              <CoolButton
                text="לא התחסן ורשם שכן"
                action={() => {
                  if (isValid()) {
                  }
                }}
                isDisabled={!isValid()}
              />
            </Grid>
          </Grid>
        </List>
      </FormControl>
    </div>
  );
}

export default Management;
