import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
} from '@material-ui/core';

const AddAppointment = () => {
  return (
    <Paper>
      <FormControl>
        <InputLabel htmlFor="my-input">מספר אישי:</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormLabel component="legend">שאלה ראשונה</FormLabel>
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

        <FormLabel component="legend">שאלה שנייה</FormLabel>
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

        <FormLabel component="legend">שאלה שלישית</FormLabel>
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
    </Paper>
  );
};

export default AddAppointment;
