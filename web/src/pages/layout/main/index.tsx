import React from 'react';
import RouterView from 'src/components/RouterView';
import { IRouterItem } from 'src/router';

interface IMainProps {
  router: IRouterItem[];
}

const Main = (props: IMainProps) => {
  return <RouterView router={props.router} />;
};

export default Main;
