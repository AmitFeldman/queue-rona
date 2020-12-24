import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {
  AppBar,
  Button,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';

const AddAppointment = () => {
  return (
    <Paper>
      <List dense>
        <ListItem>
          <ListItemText primary="האם פיתחת בעבר תגובה חמורה לאחר שחוסנת בחיסון קורונה או חיסון אחר?" />
          <ListItemSecondaryAction>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top">
              <FormControlLabel
                value="yes1"
                control={<Radio color="primary" />}
                label="כן"
                labelPlacement="start"
              />
              <FormControlLabel
                value="no1"
                control={<Radio color="primary" />}
                label="לא"
                labelPlacement="start"
              />
            </RadioGroup>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <FormControl>
        <TextField placeholder="מספר אישי" />
        <br />
        <FormLabel component="legend">
          האם פיתחת בעבר תגובה חמורה לאחר שחוסנת בחיסון קורונה או חיסון אחר?
        </FormLabel>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top">
          <FormControlLabel
            value="yes1"
            control={<Radio color="primary" />}
            label="כן"
            labelPlacement="start"
          />
          <FormControlLabel
            value="no1"
            control={<Radio color="primary" />}
            label="לא"
            labelPlacement="start"
          />
        </RadioGroup>

        <br />
        <FormLabel component="legend">
          האם ידועה אלרגיה לתרופה/חיסון/מזון?
        </FormLabel>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top">
          <FormControlLabel
            value="yes2"
            control={<Radio color="primary" />}
            label="כן"
            labelPlacement="start"
          />
          <FormControlLabel
            value="no2"
            control={<Radio color="primary" />}
            label="לא"
            labelPlacement="start"
          />
        </RadioGroup>

        <br />
        <FormLabel component="legend">האם את/ה סובל/ת ממחלת חום?</FormLabel>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top">
          <FormControlLabel
            value="yes3"
            control={<Radio color="primary" />}
            label="כן"
            labelPlacement="start"
          />
          <FormControlLabel
            value="no3"
            control={<Radio color="primary" />}
            label="לא"
            labelPlacement="start"
          />
        </RadioGroup>
      </FormControl>

      <br />
      <Button variant="contained" color="primary">
        שלח!
      </Button>
    </Paper>
  );
};

export default AddAppointment;
