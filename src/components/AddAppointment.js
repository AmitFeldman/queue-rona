import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {
  Button,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Box,
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
      color="white"
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
      right: '0',
      position: 'absolute',
    },
  })
);

const AddAppointment = () => {
  const {
    button,
    background,
    center,
    bold,
    white,
    fullWidth,
    left,
  } = useStyles();
  const [open, setOpen] = React.useState(false);

  const [id, setId] = React.useState('');
  const [q1, setQ1] = React.useState();
  const [q2, setQ2] = React.useState();
  const [q3, setQ3] = React.useState();

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
            <ListItem>
              <label className={bold}>אנא ענו על השאלות הבאות</label>
            </ListItem>
            <ListItem>
              <label component="legend">
                האם סבלת ממחלה עם חום מעל 38° ביומיים האחרונים ?
              </label>
              <RadioOptions value={q1} setValue={setQ1} />
            </ListItem>

            <ListItem>
              <label component="legend">
                האם ידועה אלרגיה לתרופה, חיסון או מזון ?
              </label>
              <RadioOptions value={q2} setValue={setQ2} />
            </ListItem>

            <ListItem>
              <label component="legend">
                האם בידך מזרק אפיפן בעקבות תגובה אלרגית משמעותית ?
              </label>
              <RadioOptions value={q3} setValue={setQ3} />
            </ListItem>

            <ListItem>
              <label>
                האם פותחה בעבר תגובה אלרגית חמורה לאחר מנת החיסון הראשונה לנגיף
                הקורונה ?
              </label>
            </ListItem>
            <ListItem>
              <RadioOptions value={q3} setValue={setQ3} />
            </ListItem>
            <ListItem>
              <div className={left}>
                <CoolButton
                  text="שלח"
                  action={() => {
                    setOpen(true);
                    setTimeout(() => setOpen(false), TIMEOUT);
                  }}
                />
              </div>
            </ListItem>
          </List>
        </FormControl>
      </div>
      <SimpleDialog open={open} />
    </div>
  );
};

export default AddAppointment;
