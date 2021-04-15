import React, { useContext } from 'react';
import { Box, Drawer } from '@material-ui/core';
import { RequestInterfaceCtx } from 'src/pages/request-interface';
import RequestStatus from 'src/pages/request-interface/panel/components/RequestStatus';

const RequestPanel = () => {
  const visible = useContext(RequestInterfaceCtx.getContext('panelStatus'))
    .visible;
  return (
    <Drawer
      anchor={'right'}
      elevation={100}
      style={{
        width: 1000,
      }}
      open={visible || false}
      onClose={() => {
        RequestInterfaceCtx.dispatch('updatePanelStatus', { visible: false });
      }}
    >
      <Box>
        <RequestStatus />
      </Box>
    </Drawer>
  );
};

export default RequestPanel;
