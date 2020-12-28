import Paper from '@material-ui/core/Paper';
import React from 'react';

const SoldierCardWrapper = ({children, greenBorder = false}) => {
  return (
    <Paper
      style={{
        height: '80%',
        width: '70%',
        margin: 'auto',
        backgroundColor: 'rgba(247, 247, 255)',
        border: `solid ${greenBorder ? 'green' : 'rgba(212, 211, 216)'} 2px`,
        borderRadius: '15px',
      }}>
      {children}
    </Paper>
  );
};

export default SoldierCardWrapper;
