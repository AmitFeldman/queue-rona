import React, {useEffect} from 'react';
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

const TIMEOUT = 3000;

function SimpleDialog({open}) {
  const {center} = useStyles();

  return (
    <Dialog open={open}>
      <DialogTitle className={center}>הפרטים נשלחו!</DialogTitle>
      <DialogContent>
        <Typography variant="body1">ניתן לקרוא למתחסן הבא</Typography>
      </DialogContent>
    </Dialog>
  );
}

const CoolButton = ({text, action}) => {
  const {button} = useStyles();
  return (
    <Button
      // disabled={q5 !== null}
      className={button}
      style={{backgroundColor: 'white'}}
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
      '& .MuiInputBase-input': {
        backgroundColor: 'white !important',
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

const CanGetVaccinated = () => {
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
  const [q4, setQ4] = React.useState('');
  const [q5, setQ5] = React.useState(null);

  useEffect(() => {
    getSoldierInfo();
  }, []);

  async function getInfo() {
    return await axios.get(
      `https://corona-server.azurewebsites.net/SoldierInfo/100`
    );
  }
  function getSoldierInfo() {
    getInfo()
      .then((res) => {
        const data = res['data'];
        setId('');
        setQ1(data.q1);
        setQ2(data.q2);
        setQ3(data.q3);
        setQ4(data.q4);
      })
      .catch((rej) => {
        alert(rej);
      });
  }
  async function getResultDeclareSoldierVaccinable() {
    return await axios
      .put(
        `http://corona-server.azurewebsites.net/${soldierId}/vaccination_ability`,
        {
          isAbleToVaccinate: q5,
        }
      )

      .catch((rej) => {
        alert(rej);
      });
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
                מספר אישי
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
                  <label className={bold}>תשובות החייל</label>
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
                    האם ידועה אלרגיה לתרופה, חיסון או מזון ?
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
                    האם בידך מזרק אפיפן בעקבות תגובה אלרגית משמעותית ?
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
                    לנגיף הקורונה ?
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
                <Grid item xs={12}>
                  <label className={bold}>סיכום התשאול</label>
                </Grid>
                <Grid item xs={12}>
                  <div className={left}>
                    <List style={{padding: 0}}>
                      <ListItem style={{paddingRight: 0, padding: 0}}>
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q5 === true ? '#000066' : 'white',
                            color: q5 === true ? 'white' : 'black',
                          }}
                          tabIndex="1"
                          control={
                            <Radio
                              className={radio}
                              color="primary"
                              checked={q5 === true}
                              onChange={() => {
                                setQ5(true);
                              }}
                            />
                          }
                          label="יכול להתחסן ✔️"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          className={radioBox}
                          style={{
                            backgroundColor: q5 === false ? '#000066' : 'white',
                            color: q5 === false ? 'white' : 'black',
                            marginRight: '1rem',
                          }}
                          tabIndex="1"
                          control={
                            <Radio
                              className={radio}
                              color="primary"
                              checked={q5 === false}
                              onChange={() => {
                                setQ5(false);
                              }}
                            />
                          }
                          label="לא יכול להתחסן ❌"
                          labelPlacement="start"
                        />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Grid item xs={12} style={{paddingLeft: 0}}>
                  <div className={left}>
                    <CoolButton
                      disabled={true}
                      text="שלח"
                      action={() => {
                        //      if (isValid()) {
                        getResultDeclareSoldierVaccinable();
                        setOpen(true);
                        setTimeout(() => setOpen(false), TIMEOUT);
                        //    }
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

export default CanGetVaccinated;
