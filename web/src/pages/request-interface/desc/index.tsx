import React from 'react';
import { Typography, Link } from '@material-ui/core';

const Desc = () => {
  return (
    <React.Fragment>
      <Typography variant="h5">Api Docs</Typography>
      <Typography variant="body1" gutterBottom>
        <Link href="#">Link</Link>
      </Typography>
    </React.Fragment>
  );
};

export default Desc;
