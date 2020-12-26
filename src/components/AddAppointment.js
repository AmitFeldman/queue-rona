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

const TIMEOUT = 3000;

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

const CoolButton = ({text, action}) => {
  const {button} = useStyles();
  return (
    <Button
      className={button}
      style={{'background-color': 'white'}}
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
    text: {
      '.MuiInputBase-input': {
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
    radio: {
      display: 'none',
    },
    radioBox: {
      backgroundColor: 'white',
      cursor: 'default',
      border: 'solid 1px lightGray',
      display: 'block',
      'padding-right': '1.5rem',
      'padding-top': '0.1rem',
      'padding-bottom': '0.1rem',
      'padding-left': '1.5rem',
      'border-radius': '5px',
      'margin-left': '0',
      textAlign: 'center',
      border: 'solid 1px lightGray',
      outline: '0',
      cursor: 'pointer',
    },
  })
);

const AddAppointment = () => {
  const {
    background,
    center,
    bold,
    fullWidth,
    left,
    grid,
    radioBox,
    radio,
    text,
  } = useStyles();
  const [open, setOpen] = React.useState(false);

  const [soldierId, setId] = React.useState('');
  const [q1, setQ1] = React.useState();
  const [q2, setQ2] = React.useState();
  const [q3, setQ3] = React.useState();
  const [q4, setQ4] = React.useState();

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
              <label
                className={center + ' ' + fullWidth}
                style={{fontSize: '120%'}}>
                הכנס מספר אישי
              </label>
            </ListItem>
            <div className={fullWidth}>
              <TextField
                className={center + ' ' + text}
                variant="outlined"
                value={soldierId}
                onChange={(e) => setId(e?.target?.value)}
              />
            </div>
            <div className={grid + ' ' + center}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label className={bold}>אנא ענו על השאלות הבאות</label>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <label component="legend">
                      האם סבלת ממחלה עם חום מעל 38° ביומיים האחרונים ?
                    </label>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <List style={{padding: 0}}>
                      <ListItem style={{'padding-right': 0, padding: 0}}>
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q1 === true ? '#000066' : 'white',
                            color: q1 == true ? 'white' : 'black',
                          }}
                          tabindex="1"
                          control={
                            <Radio
                              className={radio}
                              color="primary"
                              checked={q1 === true}
                              onChange={() => {
                                setQ1(true);
                              }}
                            />
                          }
                          label="כן"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q1 === false ? '#000066' : 'white',
                            color: q1 == false ? 'white' : 'black',
                            'margin-right': '1rem',
                          }}
                          tabindex="1"
                          control={
                            <Radio
                              className={radio}
                              color="primary"
                              checked={q1 === false}
                              onChange={() => {
                                setQ1(false);
                              }}
                            />
                          }
                          label="לא"
                          labelPlacement="start"
                        />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <label component="legend">
                    האם ידועה אלרגיה לתרופה, חיסון או מזון ?
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <List style={{padding: 0}}>
                      <ListItem style={{'padding-right': 0, padding: 0}}>
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q2 === true ? '#000066' : 'white',
                            color: q2 == true ? 'white' : 'black',
                          }}
                          tabindex="1"
                          control={
                            <Radio
                              className={radio}
                              color="primary"
                              checked={q2 === true}
                              onChange={() => {
                                setQ2(true);
                              }}
                            />
                          }
                          label="כן"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q2 === false ? '#000066' : 'white',
                            color: q2 == false ? 'white' : 'black',
                            'margin-right': '1rem',
                          }}
                          tabindex="1"
                          control={
                            <Radio
                              className={radio}
                              color="primary"
                              checked={q2 === false}
                              onChange={() => {
                                setQ2(false);
                              }}
                            />
                          }
                          label="לא"
                          labelPlacement="start"
                        />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <label component="legend">
                    האם בידך מזרק אפיפן בעקבות תגובה אלרגית משמעותית ?
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <List style={{padding: 0}}>
                      <ListItem style={{'padding-right': 0, padding: 0}}>
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q3 === true ? '#000066' : 'white',
                            color: q3 == true ? 'white' : 'black',
                          }}
                          tabindex="1"
                          control={
                            <Radio
                              className={radio}
                              color="primary"
                              checked={q3 === true}
                              onChange={() => {
                                setQ3(true);
                              }}
                            />
                          }
                          label="כן"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q3 === false ? '#000066' : 'white',
                            color: q3 == false ? 'white' : 'black',
                            'margin-right': '1rem',
                          }}
                          tabindex="1"
                          control={
                            <Radio
                              className={radio}
                              color="primary"
                              checked={q3 === false}
                              onChange={() => {
                                setQ3(false);
                              }}
                            />
                          }
                          label="לא"
                          labelPlacement="start"
                        />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <label>
                    האם פותחה בעבר תגובה אלרגית חמורה לאחר מנת החיסון הראשונה
                    לנגיף הקורונה ?
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <List style={{padding: 0}}>
                      <ListItem style={{'padding-right': 0, padding: 0}}>
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q4 === 'yes' ? '#000066' : 'white',
                            color: q4 === 'yes' ? 'white' : 'black',
                          }}
                          tabindex="1"
                          control={
                            <Radio
                              className={radio}
                              color="primary"
                              checked={q4 === 'yes'}
                              onChange={() => {
                                setQ4('yes');
                              }}
                            />
                          }
                          label="כן"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q4 === 'no' ? '#000066' : 'white',
                            color: q4 === 'no' ? 'white' : 'black',
                            'margin-right': '1rem',
                          }}
                          tabindex="1"
                          control={
                            <Radio
                              className={radio}
                              color="primary"
                              checked={q4 === 'no'}
                              onChange={() => {
                                setQ4('no');
                              }}
                            />
                          }
                          label="לא"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor:
                              q4 === 'first' ? '#000066' : 'white',
                            color: q4 === 'first' ? 'white' : 'black',
                            'margin-right': '1rem',
                          }}
                          tabindex="1"
                          control={
                            <Radio
                              className={radio}
                              color="primary"
                              checked={q4 === 'first'}
                              onChange={() => {
                                setQ4('first');
                              }}
                            />
                          }
                          label="חיסון קורונה ראשון"
                          labelPlacement="start"
                        />
                      </ListItem>
                    </List>
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
