import {Typography} from '@material-ui/core';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

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
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h6">
          {current !== undefined ? 'חייל : ' + current : 'העמדה פנויה'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Station;
