import React from 'react';
import ReactDOM from 'react-dom';
import RouterView from './components/RouterView';
import router from './router';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useGlobalStyles = makeStyles({
  '@global': {
    body: {
      margin: 0,
    },
    '.iconfont': {
      fontSize: 22,
    },
  },
});

const App = () => {
  useGlobalStyles();

  return (
    <BrowserRouter>
      <RouterView router={router} />
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
