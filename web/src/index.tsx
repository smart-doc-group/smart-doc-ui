import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import RouterView from './components/RouterView';
import router from './router';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <RouterView router={router} />
  </BrowserRouter>,
  document.getElementById('root')
);
