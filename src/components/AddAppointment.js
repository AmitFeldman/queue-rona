import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';

import {
  Button,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Grid,
  createStyles,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import makeStyles from '@material-ui/core/styles/makeStyles';

const TIMEOUT = 1000;

function SimpleDialog({open}) {
  return (
    <Dialog open={open}>
      <DialogTitle>תורך נשלח!</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          אנא הכנס לאולם והמתן ביציע החיסונים
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

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

const CoolButton = ({text, action}) => {
  const {button} = useStyles();
  return (
    <Button
      className={button}
      variant="outlined"
      color="default"
      onClick={() => {
        action();
      }}>
      {text}
    </Button>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      width: 'fit-content',
    },
    background: {
      'background-color': '#EEEEEE',
    },
    center: {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
    },
    bold: {
      'font-weight': 'bold',
    },
    white: {
      input: {
        'background-color': 'white !important',
      },
    },
    fullWidth: {
      width: '100%',
    },
    left: {
      float: 'right',
    },
    grid: {
      'text-align': 'left !important',
      width: '50%',
      display: 'inline-block !important',
    },
  })
);

const AddAppointment = () => {
  const {background, center, bold, white, fullWidth, left, grid} = useStyles();
  const [open, setOpen] = React.useState(false);

  const [soldierId, setId] = React.useState('');
  const [q1, setQ1] = React.useState();
  const [q2, setQ2] = React.useState();
  const [q3, setQ3] = React.useState();

  async function getResult() {
    const params = new URLSearchParams();
    let article = {ID: soldierId};
    params.append('0', JSON.stringify(article));
    return await axios.post(
      'http://127.0.0.1:5000/AddSoldierToArrivalQueue',
      params
    );
  }

  const [data, setData] = useState({hits: []});
  function give() {
    getResult()
      .then((res) => {
        alert(res.data.data);
      })
      .catch((res) => {
        alert(res.data.data);
      });
  }
  return (
    <div>
      <div className={background}>
        <FormControl>
          <List>
            <ListItem>
              <label className={center + ' ' + fullWidth}>הזן מספר אישי</label>
            </ListItem>
            <ListItem>
              <div className={fullWidth}>
                <TextField
                  className={center + ' ' + white}
                  variant="outlined"
                  value={id}
                  onChange={(e) => setId(e?.target?.value)}
                />

              </div>
            </ListItem>
            <div className={grid + ' ' + center}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label className={bold}>אנא ענו על השאלות הבאות</label>
                </Grid>
                <Grid item xs={8}>
                  <div>
                    <label component="legend">
                      האם סבלת ממחלה עם חום מעל 38° ביומיים האחרונים ?
                    </label>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className={left}>
                    <RadioOptions value={q1} setValue={setQ1} />
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <label component="legend">
                    האם ידועה אלרגיה לתרופה, חיסון או מזון ?
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <div className={left}>
                    <RadioOptions value={q2} setValue={setQ2} />
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <label component="legend">
                    האם בידך מזרק אפיפן בעקבות תגובה אלרגית משמעותית ?
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <div className={left}>
                    <RadioOptions value={q3} setValue={setQ3} />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <label>
                    האם פותחה בעבר תגובה אלרגית חמורה לאחר מנת החיסון הראשונה
                    לנגיף הקורונה ?
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <div className={left}>
                    <RadioOptions value={q3} setValue={setQ3} />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className={left}>
                    <CoolButton
                      text="שלח"
                      action={() => {
                        setOpen(true);
                        setTimeout(() => setOpen(false), TIMEOUT);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </List>
        </FormControl>
      </div>


      <SimpleDialog open={open} />
    </div>
  );
};

export default AddAppointment;
