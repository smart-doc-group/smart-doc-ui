/* eslint-disable no-unused-vars */
import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const RequestStatus = () => {
  const [curMethod, setCurMethod] = useState<Method>(Method.GET);

  return (
    <>
      <Select
        value={curMethod}
        onChange={(e) => setCurMethod(e.target.value as Method)}
      >
        <MenuItem value={Method.GET}>{Method.GET}</MenuItem>
        <MenuItem value={Method.POST}>{Method.POST}</MenuItem>
        <MenuItem value={Method.PUT}>{Method.PUT}</MenuItem>
        <MenuItem value={Method.DELETE}>{Method.DELETE}</MenuItem>
      </Select>
      <TextField />
      <Button variant="outlined">Send</Button>
    </>
  );
};

export default RequestStatus;
