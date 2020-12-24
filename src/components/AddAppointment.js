import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  List,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';

const AddAppointment = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{minHeight: '100vh'}}>
      <Paper>
        <FormControl>
          <List>
            <ListItem>
              <TextField placeholder="מספר אישי" />
            </ListItem>
            <ListItem>
              <FormLabel component="legend">
                האם פיתחת בעבר תגובה חמורה לאחר שחוסנת בחיסון קורונה או חיסון
                אחר?
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
            </ListItem>

            <ListItem>
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
            </ListItem>

            <ListItem>
              <FormLabel component="legend">
                האם את/ה סובל/ת ממחלת חום?
              </FormLabel>
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
            </ListItem>
          </List>

          <Button variant="contained" color="primary">
            שלח
          </Button>
        </FormControl>
      </Paper>
    </Grid>
  );
};

export default AddAppointment;
