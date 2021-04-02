import { Drawer } from '@material-ui/core';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RequestInterfaceCtx } from '..';

const useStyles = makeStyles({
  list: {
    width: 700,
  },
});

const RequestPanel = () => {
  const classes = useStyles();
  const visible = useContext(RequestInterfaceCtx.getContext('panelStatus'))
    .visible;
  return (
    <>
      <Drawer
        anchor={'right'}
        elevation={100}
        open={visible}
        onClose={() => {
          RequestInterfaceCtx.dispatch('updatePanelStatus', { visible: false });
        }}
      >
        <div className={classes.list}>test</div>
      </Drawer>
    </>
  );
};

export default RequestPanel;
