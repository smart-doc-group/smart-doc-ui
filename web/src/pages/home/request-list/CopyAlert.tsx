import React, { useCallback } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import { Snackbar } from '@material-ui/core';

const Alert = (props: AlertProps) => {
  return <MuiAlert variant="filled" {...props} />;
};

interface CopyAlertProps {
  open: boolean;
  onClose?: () => void;
}

const CopyAlert = (props: CopyAlertProps) => {
  const handleClose = useCallback(
    (_event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      props.onClose?.();
    },
    []
  );

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={2500}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        icon={<CheckIcon fontSize="inherit" />}
      >
        Copied to clipboard!
      </Alert>
    </Snackbar>
  );
};

export default CopyAlert;
