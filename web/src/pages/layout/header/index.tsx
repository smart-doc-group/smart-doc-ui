import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Select, Typography, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-between',
  },
  select: {
    minWidth: '160px',
    marginLeft: '8px',
  },
  homeBtn: {
    color: 'white',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Button size="small" className={classes.homeBtn}>
          smart-doc
        </Button>
        <Typography variant="body1">
          Select a spec
          <Select className={classes.select}>
            <MenuItem value={10}>test-stock-proj</MenuItem>
            <MenuItem value={20}>test-setting-proj</MenuItem>
            <MenuItem value={30}>test-app-proj</MenuItem>
          </Select>
        </Typography>
      </Toolbar>
    </>
  );
};

export default Header;
Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
