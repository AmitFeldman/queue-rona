import {Divider, Typography, Box} from '@material-ui/core';
import React from 'react';

const Header = ({text}) => {
  return (
    <Box p={1}>
      <Typography variant="h4">{text}</Typography>
      <Divider />
    </Box>
  );
};

export default Header;
