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
  Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

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

const AddAppointment = () => {
  const [id, setId] = React.useState('');
  const [open, setOpen] = React.useState(false);

  return (
    <>
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
                <TextField
                  placeholder="מספר אישי"
                  value={id}
                  onChange={(e) => setId(e?.target?.value)}
                />
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

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setOpen(true);
                setTimeout(() => setOpen(false), TIMEOUT);
              }}>
              שלח
            </Button>
          </FormControl>
        </Paper>
      </Grid>

      <SimpleDialog open={open} />
    </>
  );
};

export default AddAppointment;
