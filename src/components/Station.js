import React from 'react';
import {Typography, Paper, Box, Divider} from '@material-ui/core';

const ALERT_TIMEOUT = 3000;

const Station = ({name, current}) => {
  const [alert, setAlert] = React.useState(false);

  React.useEffect(() => {
    if (current !== undefined) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, ALERT_TIMEOUT);
    }
  }, [current]);

  return (
    <Paper style={{backgroundColor: alert ? 'lightgreen' : 'white'}}>
      <Box p={1}>
        <Typography variant="h3">
          {current !== undefined ? current : 'פנוי'}
        </Typography>
        <Divider />
        <Typography variant="h6">{'עמדה: ' + name}</Typography>
      </Box>
    </Paper>
  );
};

export default Station;
