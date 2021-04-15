import { getConTexts, Provider } from 'easy-create-react-context';
import React from 'react';
import RequestInterfaceList from 'src/pages/request-interface/list';
import RequestPanel from 'src/pages/request-interface/panel';
import RequestInterfaceStore from 'src/pages/request-interface/store';

export const RequestInterfaceCtx = getConTexts<RequestInterfaceStore>();

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
