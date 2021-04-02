import { getConTexts, Provider } from 'easy-create-react-context';
import React from 'react';
import RequestInterfaceList from './list';
import RequestPanel from './panel';
import RequestInterfaceStore, { TRequestInterfaceStore } from './store';

export const RequestInterfaceCtx = getConTexts<TRequestInterfaceStore>();

const RequestInterface = () => {
  return (
    <Provider
      contexts={RequestInterfaceCtx}
      value={new RequestInterfaceStore()}
    >
      <RequestInterfaceList />
      <RequestPanel />
    </Provider>
  );
};

export default RequestInterface;
