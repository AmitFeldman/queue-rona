import React, {useEffect} from 'react';
import FormControl from '@material-ui/core/FormControl';
import {
  Button,
  Grid,
  FormControlLabel,
  ControlLable,
  FormLabel,
  List,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  ButtonGroup,
} from '@material-ui/core';

const IsSoldierArrived = () => {
  const soldierId = 123456;
  useEffect(() => {
    // Update the document title using the browser API
  });

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{minHeight: '100vh'}}>
      <Paper style={{width: '40vw'}}>
        <br />
        <br />
        <br />
        <List dense></List>
        <FormLabel style={{fontSize: '210%'}}>
          {' '}
          מספר אישי: <b>{soldierId} </b>
        </FormLabel>
        <br />
        <br />

        <FormLabel style={{fontSize: '250%'}} component="legend">
          האם החייל הגיע לעמדה?
        </FormLabel>
        <br />
        <br />
        <ButtonGroup
          margin="dense"
          style={{display: 'flex', justifyContent: 'center'}}
          row
          aria-label="position"
          name="position"
          defaultValue="top">
          <Button
            variant="contained"
            color="primary"
            style={{
              borderRadius: '5px',
              margin: '15px',
              width: '20%',
              fontSize: '180%',
            }}>
            הגיע
          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{
              borderRadius: '5px',
              margin: '15px',
              width: '20%',
              fontSize: '180%',
            }}>
            לא הגיע
          </Button>
        </ButtonGroup>
        <br />
        <br />
      </Paper>
    </Grid>
  );
};

export default IsSoldierArrived;
