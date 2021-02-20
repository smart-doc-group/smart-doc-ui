import React from 'react';
import { IRouterItem } from 'src/router';
import Main from './main';
import SideMenu from './side-menu';

interface ILayoutProps {
  router: IRouterItem[];
}

const Layout = (props: ILayoutProps) => {
  return (
    <>
      <SideMenu />
      <Main router={props.router} />
    </>
  );
};

export default Layout;
