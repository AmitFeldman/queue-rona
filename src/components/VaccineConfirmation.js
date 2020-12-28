import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import VIcon from '../images/v.png';
import XIcon from '../images/x.png';
import {
  Button,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  createStyles,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Popup from 'reactjs-popup';

const TIMEOUT = 6000;

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
      backgroundColor: 'white',
      color: 'black',
    },
    center: {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      textAlign: 'center',
    },
    radio: {
      display: 'none',
    },
    radioBox: {
      backgroundColor: 'white',
      'border-radius': '5px',
      cursor: 'default',
      border: 'solid 1px lightGray',
      display: 'block',
      padding: '7px',
      textAlign: 'center',
      outline: '0',
      width: '10rem',
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
    textSimpleDialog: {
      '& .MuiInputBase-input': {
        backgroundColor: 'white !important',
        fontSize: '110%',
        textAlign: 'center',
        width: '7rem',
        fontSize: '30px',
      },
    },
  })
);

function VaccineConfirmation() {
  const {button} = useStyles();
  const {radio} = useStyles();
  const {radioBox} = useStyles();
  const {popup} = useStyles();

  const [soldierId, setId] = React.useState('');
  const [wasVaccinated, setWasVaccinated] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);

  // Popup window
  const [open, setOpen] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  async function getResult() {
    let soldierIdInteger = parseInt(soldierId);
    let soldierIdWithoutZeroPrefix = soldierIdInteger.toString();
    let soldierJson = {
      wasVaccinated: wasVaccinated,
    };
    return await axios.put(
      `https://corona-server.azurewebsites.net/${soldierIdWithoutZeroPrefix}/was_vaccinated`,
      soldierJson,
      {headers: {'Content-Type': 'application/json'}}
    );
  }
  async function addToCPRList() {
    let soldierIdInteger = parseInt(soldierId);
    let soldierIdWithoutZeroPrefix = soldierIdInteger.toString();
    return await axios.post(
      `https://corona-server.azurewebsites.net/${soldierIdWithoutZeroPrefix}/wasVaccinated`,
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
        addToCPRList()
          .then((res) => {
            window.location.reload(false);
          })
          .catch((rej) => {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), TIMEOUT);
            window.location.reload(false);
          });
      })
      .catch((rej) => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), TIMEOUT);
        setTimeout(() => window.location.reload(false), TIMEOUT / 3);
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
              style={{backgroundColor: '#FCFCFC'}}
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
              style={{display: 'flex', justifyContent: 'center'}}
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
                      <div>כן, התחסן</div>
                    </ListItem>
                  </>
                }
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
                      <div>לא, משהו השתבש</div>
                    </ListItem>
                  </>
                }
                labelPlacement="start"
              />
            </RadioGroup>
          </ListItem>

          <ListItem
            style={{
              paddingTop: '40px',
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}>
            <Button
              className={button}
              disabled={!isInputValid(soldierId)}
              variant="contained"
              color="primary"
              onClick={() => {
                give();
              }}>
              שלח
            </Button>
          </ListItem>
        </List>
      </FormControl>
      <Dialog open={showPopup} className="popup">
        <DialogTitle>
          <p>מספר אישי לא תקין</p>
        </DialogTitle>
      </Dialog>
    </Grid>
  );
}

export default VaccineConfirmation;
