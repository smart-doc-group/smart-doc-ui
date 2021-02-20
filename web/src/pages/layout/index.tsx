import {
  AppBar,
  Box,
  createStyles,
  Drawer,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';
import React from 'react';
import RouterView from 'src/components/RouterView';
import { IRouterItem } from 'src/router';
import Header from './header';
import SideMenu from './side-menu';

interface ILayoutProps {
  router: IRouterItem[];
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const Layout = (props: ILayoutProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Header />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <SideMenu />
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <RouterView router={props.router} />
      </main>
    </Box>
  );
};

export default Layout;
