import React, {useEffect, makeStyles} from 'react';
import {
  Button,
  Grid,
  FormLabel,
  List,
  Paper,
  ButtonGroup,
  FormControl,
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
        <List dense></List>
        <FormControl>
          <FormLabel
            component="legend"
            spacing={30}
            style={{fontSize: '210%', padding: '3vh'}}>
            מספר אישי: <b>{soldierId} </b>
          </FormLabel>

          <FormLabel
            style={{fontSize: '250%', padding: '4vh'}}
            component="legend">
            האם החייל הגיע לעמדה?
          </FormLabel>

          <ButtonGroup
            style={{display: 'flex', justifyContent: 'center', padding: '20px'}}
            row
            aria-label="position"
            name="position"
            defaultValue="top">
            <Button
              style={{fontSize: '23px', width: '120px'}}
              variant="contained"
              color="primary">
              הגיע
            </Button>
            <Button
              style={{marginRight: '2vw', fontSize: '23px', width: '120px'}}
              variant="contained"
              color="primary">
              לא הגיע
            </Button>
          </ButtonGroup>
        </FormControl>
      </Paper>
    </Grid>
  );
};

export default IsSoldierArrived;
