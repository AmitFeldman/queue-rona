import React, {useEffect} from 'react';
import {
  Button,
  Grid,
  FormLabel,
  List,
  Paper,
  ButtonGroup,
  FormControl,
  makeStyles,
} from '@material-ui/core';

const IsSoldierArrived = () => {
  const soldierId = 123456;
  useEffect(() => {
    // Update the document title using the browser API
  });

  const useStyles = makeStyles((theme) => ({
    formLable: {
      padding: '3vh',
      fontSize: '210%',
    },
    button: {
      fontSize: '23px',
      width: '120px',
      marginRight: '2vw',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    },
    paper: {
      width: '40vw',
      fontSize: '20px',
    },
    grid: {
      minHeight: '80vh',
    },
  }));

  const {button, formLable, buttonGroup, paper, grid} = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      className={grid}>
      <Paper className={paper}>
        <List dense></List>
        <FormControl>
          <FormLabel component="legend" spacing={30} className={formLable}>
            {' '}
            מספר אישי: <b>{soldierId} </b>
          </FormLabel>

          <FormLabel className={formLable}>האם החייל הגיע לעמדה?</FormLabel>

          <ButtonGroup
            className={buttonGroup}
            row
            aria-label="position"
            name="position"
            defaultValue="top">
            <Button
              className={button}
              href="./VaccineApproval"
              variant="contained"
              color="primary">
              הגיע
            </Button>
            <Button className={button} variant="contained" color="primary">
              לא הגיע
            </Button>
          </ButtonGroup>
        </FormControl>
      </Paper>
    </Grid>
  );
};

export default IsSoldierArrived;
