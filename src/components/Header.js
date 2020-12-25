import {Divider, Typography} from '@material-ui/core';
import React from 'react';

const Header = ({text}) => {
  return (
    <>
      <Typography variant="h4">{text}</Typography>
      <Divider />
      <br />
    </>
  );
};

export default Header;
