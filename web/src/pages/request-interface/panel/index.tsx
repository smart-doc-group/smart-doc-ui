import { Button, Drawer } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  list: {
    width: 700,
  },
});

const RequestPanel = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Request</Button>
      <Drawer
        anchor={'right'}
        elevation={100}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className={classes.list}>test</div>
      </Drawer>
    </>
  );
};

export default RequestPanel;
