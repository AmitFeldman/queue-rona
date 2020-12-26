import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';

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

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: '1%',
    },
  })
);

const AddAppointment = () => {
  const {button} = useStyles();
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
    <>
      <Box m="auto" width="60%">
        <Paper>
          <FormControl>
            <List>
              <ListItem>
                <TextField
                  placeholder="מספר אישי"
                  value={soldierId}
                  onChange={(e) => setId(e?.target?.value)}
                />
              </ListItem>
              <ListItem>
                <FormLabel component="legend">
                  האם פיתחת בעבר תגובה חמורה לאחר שחוסנת בחיסון קורונה או חיסון
                  אחר?
                </FormLabel>
                <RadioOptions value={q1} setValue={setQ1} />
              </ListItem>

              <ListItem>
                <FormLabel component="legend">
                  האם ידועה אלרגיה לתרופה/חיסון/מזון?
                </FormLabel>
                <RadioOptions value={q2} setValue={setQ2} />
              </ListItem>

              <ListItem>
                <FormLabel component="legend">
                  האם את/ה סובל/ת ממחלת חום?
                </FormLabel>
                <RadioOptions value={q3} setValue={setQ3} />
              </ListItem>
            </List>

            <Button
              className={button}
              variant="contained"
              color="primary"
              onClick={() => {
                setOpen(true);
                give();
                setTimeout(() => setOpen(false), TIMEOUT);
              }}>
              שלח
            </Button>
          </FormControl>
        </Paper>
      </Box>

      <SimpleDialog open={open} />
    </>
  );
};

export default AddAppointment;
