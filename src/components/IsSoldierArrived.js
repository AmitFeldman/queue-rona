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
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      backgroundColor: 'white',
      color: 'black',
      cursor: 'default',
      border: 'solid 1px lightGray',
      'border-radius': '5px',
      display: 'block',
      padding: '7px',
      textAlign: 'center',
      outline: '0',
      boxShadow: '0 0 0 0',
    },
    radio: {
      display: 'none',
    },
    radioBox: {
      backgroundColor: '#333460',
      cursor: 'default',
      border: 'solid 1px lightGray',
      'border-radius': '5px',
      display: 'block',
      padding: '7px',
      textAlign: 'center',
      outline: '0',
    },
    text: {
      '& .MuiInputBase-input': {
        backgroundColor: 'white !important',
        fontSize: '300%',
        textAlign: 'center',
        width: '35vw',
        height: '20vh',
      },
    },
  })
);

function IsSoldierArrived() {
  const {button} = useStyles();
  const {radio} = useStyles();
  const {radioBox, text} = useStyles();
  const [soldierId, setId] = React.useState('');

  const [wasArrived, setWasArrived] = React.useState('');
  const [isRadiosEnabled, setIsRadiosEnabled] = React.useState(true);
  let url = window.location.href;
  let stationId = url.substring(url.lastIndexOf('/') + 1) - 1;
  const history = useHistory();
  const [shouldGetSoldier, setShouldGetSoldier] = React.useState(true);

  const dedicateSoldierToStage = async () => {
    return await axios
      .post('https://corona-server.azurewebsites.net/dedicateSoldierToStage', {
        stageId: stationId,
      })
      .then(console.log('called soldier'))
      .catch(console.log('something has happend'));
  };
  const getSoldierFromStage = async () => {
    return await axios
      .get(
        `https://corona-server.azurewebsites.net/${stationId}/getSoldierDedicatedToStage`
      )
      .then((res) => {
        console.log(JSON.stringify(res.data));
      });
  };

  const declareSoldierMissing = async () => {
    return await axios.put(
      `https://corona-server.azurewebsites.net/${soldierId}/soldierDidntArrive`
    );
  };
  const handleOnClick = (url) => {
    if (wasArrived) history.push(`${url}/${soldierId}`);
    else {
      declareSoldierMissing();
      getSoldier();
      setWasArrived('');
    }
  };

  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    console.log(shouldGetSoldier);
    getSoldier();
    setCounter(counter + 1);
    return () => {
      setShouldGetSoldier(false);
    };
  }, []);

  const getSoldier = () => {
    console.log('get soldier');
    if (!shouldGetSoldier) {
      return;
    }
    getSoldierFromStage()
      .then((stageSoldierId) => {
        if (stageSoldierId.data.soldierId) {
          setId(stageSoldierId.data.soldierId);
        } else {
          dedicateSoldierToStage()
            .then((res) => {
              setId(res.data);
            })
            .catch((rej) => {
              console.log('there are no people');
              setId('אין מתחסן קרוב בינתיים');
              if (shouldGetSoldier)
                setTimeout(() => {
                  getSoldier();
                }, 1000);
            });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  function isCanCallNextSoldier() {
    return wasArrived !== '' && soldierId;
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
              'font-size': '30px',
              paddingTop: '50px',
            }}>
            המתחסן הקרוב
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              padding: '0',
            }}></ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}>
            <TextField
              className={text}
              variant="outlined"
              value={soldierId}
              InputProps={{
                readOnly: true,
              }}
              //onChange={(e) => setId(e?.target?.value)}
            />
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              'font-size': '20px',
            }}>
            האם המתחסן הגיע? (לא לשכוח לבצע אימות באמצעות חוגר){' '}
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top">
              <FormControlLabel
                className={radioBox}
                style={{
                  backgroundColor: wasArrived === false ? '#333460' : 'white',
                  color: wasArrived === false ? 'white' : 'black',
                  marginRight: 0,
                  width: '10rem',
                }}
                tabindex="2"
                control={
                  <Radio
                    className={radio}
                    color="primary"
                    checked={wasArrived === false}
                    onChange={() => {
                      setWasArrived(false);
                      setIsRadiosEnabled(false);
                    }}
                  />
                }
                label="לא, דלג להבא בתור"
                labelPlacement="start"
              />
              <FormControlLabel
                className={radioBox}
                style={{
                  backgroundColor: wasArrived === true ? '#333460' : 'white',
                  color: wasArrived === true ? 'white' : 'black',
                  width: '10rem',
                }}
                tabindex="1"
                control={
                  <Radio
                    className={radio}
                    color="primary"
                    checked={wasArrived === true}
                    onChange={() => {
                      setWasArrived(true);
                      setIsRadiosEnabled(false);
                    }}
                  />
                }
                label="כן, המתחסן הגיע"
                labelPlacement="start"
              />
            </RadioGroup>
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}>
            <Button
              variant="contained"
              disabled={!isCanCallNextSoldier()}
              className={button}
              color="primary"
              onClick={() => {
                handleOnClick('/CanGetVaccinated');
              }}>
              המשך
            </Button>
          </ListItem>
        </List>
      </FormControl>
    </Grid>
  );
}

export default IsSoldierArrived;
