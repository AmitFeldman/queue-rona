import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import {
  Button,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  TextField,
  Typography,
  Grid,
  createStyles,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import makeStyles from '@material-ui/core/styles/makeStyles';

const TIMEOUT = 6000;

function SimpleDialog({open, soldierId, setOpen, give, setOpen2}) {
  const {center, text} = useStyles();

  return (
    <Dialog open={open} style={{margin: '3rem'}}>
      <DialogTitle className={center}>
        <p>רגע לפני כניסה לאזור ההמתנה באולם,</p>
        <p>וודאו כי המספר האישי שהוזן תקין</p>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          <div style={{marginBottom: '3rem'}}>
            <TextField
              size={'small'}
              className={center + ' ' + text}
              variant="outlined"
              value={soldierId}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <List>
            <ListItem>
              <div style={{marginLeft: '2rem'}}>
                <CoolButton
                  text="לא, חזרה לעריכה"
                  action={() => {
                    setOpen(false);
                  }}
                />
              </div>
              <CoolButton
                text="המספר תקין, תודה"
                action={() => {
                  give();
                  setOpen(false);
                  setOpen2(true);
                  setTimeout(() => setOpen2(false), TIMEOUT);
                }}
              />
            </ListItem>
          </List>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

function SimpleDialog2({open}) {
  const {center, text} = useStyles();

  return (
    <Dialog open={open}>
      <DialogTitle className={center}>
        <p>זה נראה קרוב מתמיד,</p>
        <p>אבל אנחנו עדיין מוגבלים בכמות האנשים באולם בעקבות ההנחיות</p>
        <p>המתינו מספר דקות ונאשר את כניסתכם</p>
      </DialogTitle>
    </Dialog>
  );
}

const CoolButton = ({text, action, isDisabled}) => {
  const {button} = useStyles();
  return (
    <Button
      className={button}
      style={{backgroundColor: 'white'}}
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
    left: {
      float: 'right',
    },
    grid: {
      'text-align': 'left !important',
      width: '75%',
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
      paddingRight: '1.5rem',
      paddingTop: '0.1rem',
      paddingBottom: '0.1rem',
      paddingLeft: '1.5rem',
      'border-radius': '5px',
      marginLeft: '0',
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
  const [open2, setOpen2] = React.useState(false);

  const [soldierId, setId] = React.useState('');
  const [q1, setQ1] = React.useState('');
  const [q2, setQ2] = React.useState('');
  const [q3, setQ3] = React.useState('');
  const [q4, setQ4] = React.useState('');

  async function getResultAddSoldierToSoldierTable() {
    let data = {
      soldierId: soldierId,
      arrivalTime: 123,
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
    };
    return await axios.post(
      'https://corona-server.azurewebsites.net/addSoldierToSoldierTable',
      data,
      {headers: {'Content-Type': 'application/json'}}
    );
  }

  async function getResultAddSoliderToArrivalQueue() {
    let article = {soldierId: soldierId};
    return await axios.post(
      'https://corona-server.azurewebsites.net/addSoliderToArrivalQueue',
      article,
      {headers: {'Content-Type': 'application/json'}}
    );
  }

  async function give() {
    await getResultAddSoldierToSoldierTable();
    await getResultAddSoliderToArrivalQueue();
    setId('');
    setQ1('');
    setQ2('');
    setQ3('');
    setQ4('');
  }

  function isValid() {
    return (
      soldierId.length === 7 && q1 !== '' && q2 !== '' && q3 !== '' && q4 !== ''
    );
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
            <div className={grid + ' ' + center}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label className={bold}>אנא ענו על השאלות הבאות</label>
                </Grid>
                <Grid item xs={8}>
                  <div>
                    <label component="legend">
                      האם סבלת ממחלה עם חום מעל 38° ביומיים האחרונים?
                    </label>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className={left}>
                    <List style={{padding: 0}}>
                      <ListItem style={{paddingRight: 0, padding: 0}}>
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q1 === true ? '#000066' : 'white',
                            color: q1 == true ? 'white' : 'black',
                          }}
                          tabIndex="1"
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
                            color: q1 === false ? 'white' : 'black',
                            marginRight: '1rem',
                          }}
                          tabIndex="1"
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
                <Grid item xs={8}>
                  <label component="legend">
                    האם ידועה אלרגיה לתרופה, חיסון או מזון?
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <div className={left}>
                    <List style={{padding: 0}}>
                      <ListItem style={{paddingRight: 0, padding: 0}}>
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q2 === true ? '#000066' : 'white',
                            color: q2 === true ? 'white' : 'black',
                          }}
                          tabIndex="1"
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
                            color: q2 === false ? 'white' : 'black',
                            marginRight: '1rem',
                          }}
                          tabIndex="1"
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
                <Grid item xs={8}>
                  <label component="legend">
                    האם בידך מזרק אפיפן בעקבות תגובה אלרגית משמעותית?
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <div className={left}>
                    <List style={{padding: 0}}>
                      <ListItem style={{paddingRight: 0, padding: 0}}>
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q3 === true ? '#000066' : 'white',
                            color: q3 === true ? 'white' : 'black',
                          }}
                          tabIndex="1"
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
                            color: q3 === false ? 'white' : 'black',
                            marginRight: '1rem',
                          }}
                          tabIndex="1"
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
                    לנגיף הקורונה?
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <div className={left}>
                    <List style={{padding: 0}}>
                      <ListItem style={{paddingRight: 0, padding: 0}}>
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q4 === 'yes' ? '#000066' : 'white',
                            color: q4 === 'yes' ? 'white' : 'black',
                          }}
                          tabIndex="1"
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
                            marginRight: '1rem',
                          }}
                          tabIndex="1"
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
                            marginRight: '1rem',
                          }}
                          tabIndex="1"
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
                <Grid item xs={12} style={{paddingLeft: 0}}>
                  <div className={left} style={{marginTop: '1rem'}}>
                    <CoolButton
                      text="שלח"
                      action={() => {
                        if (isValid()) {
                          setOpen(true);
                        }
                      }}
                      isDisabled={!isValid()}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </List>
        </FormControl>
      </div>

      <SimpleDialog
        open={open}
        soldierId={soldierId}
        setOpen={setOpen}
        give={give}
        setOpen2={setOpen2}
      />
      {/* <SimpleDialog2 open={open2}/> */}
    </div>
  );
};

export default AddAppointment;
