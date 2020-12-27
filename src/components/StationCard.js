import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const stationColor = 'rgba(51, 52, 96)';

const StationCard = ({stageId, soldierId}) => {
  return (
    <Paper
      style={{
        height: '80%',
        width: '70%',
        margin: 'auto',
        backgroundColor: 'rgba(247, 247, 255)',
        border: `solid ${stationColor}`,
      }}>
      <Typography variant="h4" style={{height: '50%', color: stationColor}}>
        {soldierId !== null ? soldierId : 'פנוי'}
      </Typography>
      <Typography
        style={{height: '50%', backgroundColor: stationColor, color: 'white'}}
        variant="h6">
        {'לעמדה מספר ' + stageId}
      </Typography>
    </Paper>
  );
};

export default StationCard;
