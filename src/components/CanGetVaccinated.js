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
  Grid,
  createStyles,
} from '@material-ui/core';
import {useLastLocation} from 'react-router-last-location';
import makeStyles from '@material-ui/core/styles/makeStyles';
import XIcon from '../images/x.png';
import VIcon from '../images/v.png';

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
      width: '80%',
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
      outline: '0',
    },
  })
);

const CanGetVaccinated = (props) => {
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

  const [open2, setOpen2] = React.useState(false);

  const [soldierId, setId] = React.useState('');
  const [q1, setQ1] = React.useState('');
  const [q2, setQ2] = React.useState('');
  const [q3, setQ3] = React.useState('');
  const [q4, setQ4] = React.useState('');
  const [q5, setQ5] = React.useState('');
  const [canGetVaccinated, setCanGetVaccinated] = React.useState(null);
  const lastLocation = useLastLocation();

  let url = lastLocation.pathname;
  let stationId = url.substring(url.lastIndexOf('/')) - 1;
  useEffect(() => {
    getSoldierInfo();
  }, []);

  const removeSoldierFromStage = async () => {
    return await axios
      .put(
        `https://corona-server.azurewebsites.net/${stationId}/removeSoldierFromStage`
      )
      .catch((rej) => {
        console.log(rej);
      });
  };
  async function getInfo() {
    let currentSoldierId = window.location.href.substring(
      window.location.href.lastIndexOf('/') + 1
    );
    return await axios
      .get(
        `https://corona-server.azurewebsites.net/SoldierInfo/${currentSoldierId}`
      )
      .catch((rej) => {
        console.log(rej);
      });
  }
  async function getResultDeclareSoldierVaccinable() {
    return await axios
      .put(
        `https://corona-server.azurewebsites.net/${soldierId}/vaccination_ability`,
        {
          q1: q1,
          q2: q2,
          q3: q3,
          q4: q4,
          q5: q5,
          isAbleToVaccinate: canGetVaccinated,
        }
      )
      .catch((rej) => {
        console.log(rej);
      });
  }
  function getSoldierInfo() {
    getInfo()
      .then((res) => {
        const data = res['data'];
        setId(data.soldierId);
        setQ1(data.q1);
        setQ2(data.q2);
        setQ3(data.q3);
        setQ4(data.q4);
        setQ5(data.q5);
      })
      .catch((rej) => {
        console.log(rej);
      });
  }

  function isValid() {
    if (canGetVaccinated === undefined || canGetVaccinated === null)
      return false;
    else {
      return (
        soldierId.length === 7 &&
        q1 !== '' &&
        q2 !== '' &&
        q3 !== '' &&
        q4 !== '' &&
        q5 !== ''
      );
    }
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
                disabled={true}
                size={'small'}
                inputProps={{
                  maxLength: 7,
                }}
                className={center + ' ' + text}
                variant="outlined"
                value={soldierId}
              />
            </div>
            <Grid container spacing={2} style={{marginTop: '1rem'}}>
              <Grid item xs={12}>
                <label style={{fontSize: '180%'}} className={bold}>
                  תשובות החייל
                </label>
              </Grid>
              <Grid item xs={6}>
                <div
                  className={grid + ' ' + center}
                  style={{marginTop: '1rem', float: 'left'}}>
                  <Grid container spacing={2}>
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
                                backgroundColor:
                                  q1 === true ? '#000066' : 'white',
                                color: q1 === true ? 'white' : 'black',
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
                                backgroundColor:
                                  q1 === false ? '#000066' : 'white',
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
                                backgroundColor:
                                  q2 === true ? '#000066' : 'white',
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
                                backgroundColor:
                                  q2 === false ? '#000066' : 'white',
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
                                backgroundColor:
                                  q3 === true ? '#000066' : 'white',
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
                                backgroundColor:
                                  q3 === false ? '#000066' : 'white',
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
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className={grid + ' ' + center}
                  style={{
                    marginTop: '1rem',
                    float: 'right',
                    marginRight: '1rem',
                  }}>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <label component="legend">
                        האם התחסנת בשבועיים האחרונים למחלת השפעת?
                      </label>
                    </Grid>
                    <Grid item xs={4}>
                      <div className={left}>
                        <List style={{padding: 0}}>
                          <ListItem style={{paddingRight: 0, padding: 0}}>
                            <FormControlLabel
                              className={radioBox}
                              style={{
                                backgroundColor:
                                  q5 === true ? '#000066' : 'white',
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
                              label="כן"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              className={radioBox}
                              style={{
                                backgroundColor:
                                  q5 === false ? '#000066' : 'white',
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
                              label="לא"
                              labelPlacement="start"
                            />
                          </ListItem>
                        </List>
                      </div>
                    </Grid>
                    <Grid item xs={8}>
                      <label component="legend">
                        האם אתה מתחסן בפעם הראשונה לקורונה?
                      </label>
                    </Grid>
                    <Grid item xs={4}>
                      <div className={left}>
                        <List style={{padding: 0}}>
                          <ListItem style={{paddingRight: 0, padding: 0}}>
                            <FormControlLabel
                              className={radioBox}
                              style={{
                                backgroundColor:
                                  q4 === 'first' ? '#000066' : 'white',
                                color: q4 === 'first' ? 'white' : 'black',
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
                              label="כן"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              className={radioBox}
                              style={{
                                backgroundColor:
                                  q4 === 'no' || q4 === 'yes'
                                    ? '#000066'
                                    : 'white',
                                color:
                                  q4 === 'no' || q4 === 'yes'
                                    ? 'white'
                                    : 'black',
                                marginRight: '1rem',
                              }}
                              tabIndex="1"
                              control={
                                <Radio
                                  className={radio}
                                  color="primary"
                                  checked={q4 !== 'first'}
                                  onChange={() => {
                                    setQ4(q4 === 'no' ? 'no' : 'yes');
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
                    {q4 === 'no' || q4 === 'yes' ? (
                      <Grid item xs={8}>
                        <label>
                          האם פותחה בעבר תגובה אלרגית חמורה לאחר מנת החיסון
                          הראשונה לנגיף הקורונה?
                        </label>
                      </Grid>
                    ) : null}
                    {q4 === 'no' || q4 === 'yes' ? (
                      <Grid item xs={4}>
                        <div className={left}>
                          <List style={{padding: 0}}>
                            <ListItem style={{paddingRight: 0, padding: 0}}>
                              <FormControlLabel
                                className={radioBox}
                                style={{
                                  backgroundColor:
                                    q4 === 'yes' ? '#000066' : 'white',
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
                                  backgroundColor:
                                    q4 === 'no' ? '#000066' : 'white',
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
                            </ListItem>
                          </List>
                        </div>
                      </Grid>
                    ) : null}
                  </Grid>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{fontSize: '180%', paddingTop: '2vh'}}>
              <label className={bold}>סיכום התשאול</label>
            </Grid>

            <Grid
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '2vh',
              }}
              item
              xs={12}>
              <div className={left}>
                <List>
                  <ListItem style={{paddingRight: 0, padding: 0}}>
                    <FormControlLabel
                      className={radioBox}
                      style={{
                        backgroundColor:
                          canGetVaccinated === true ? '#000066' : 'white',
                        color: canGetVaccinated === true ? 'white' : 'black',
                      }}
                      tabIndex="1"
                      control={
                        <Radio
                          className={radio}
                          color="primary"
                          checked={canGetVaccinated === true}
                          onChange={() => {
                            setCanGetVaccinated(true);
                          }}
                        />
                      }
                      label={
                        <>
                          <ListItem
                            style={{
                              display: 'flex',
                              'justify-content': 'center',
                              'align-items': 'center',
                              padding: 0,
                            }}>
                            <img
                              src={VIcon}
                              className="profile-img"
                              width="35px"
                              height="auto"
                              style={{}}
                            />
                            <div>יכול להתחסן</div>
                          </ListItem>
                        </>
                      }
                      labelPlacement="start"
                    />

                    <FormControlLabel
                      className={radioBox}
                      style={{
                        backgroundColor:
                          canGetVaccinated === false ? '#000066' : 'white',
                        color: canGetVaccinated === false ? 'white' : 'black',
                        marginRight: '1rem',
                      }}
                      tabIndex="1"
                      control={
                        <Radio
                          className={radio}
                          color="primary"
                          checked={canGetVaccinated === false}
                          onChange={() => {
                            setCanGetVaccinated(false);
                          }}
                        />
                      }
                      label={
                        <>
                          <ListItem
                            style={{
                              display: 'flex',
                              'justify-content': 'center',
                              'align-items': 'center',
                              padding: 0,
                            }}>
                            <img
                              src={XIcon}
                              className="profile-img"
                              width="35px"
                              height="auto"
                              style={{}}
                            />
                            <div>לא יכול להתחסן</div>
                          </ListItem>
                        </>
                      }
                      labelPlacement="start"
                    />
                  </ListItem>
                </List>
              </div>
            </Grid>
            <div className={grid + ' ' + center} style={{marginTop: '1rem'}}>
              <Grid>
                <Grid item xs={12} style={{paddingLeft: 0}}>
                  <div className={center} style={{marginTop: '1rem'}}>
                    <CoolButton
                      text="שלח"
                      action={() => {
                        getResultDeclareSoldierVaccinable();
                        removeSoldierFromStage().then(() =>
                          props.history.goBack()
                        );
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
    </div>
  );
};

export default CanGetVaccinated;
