import React from 'react';
// import RequestPanel from './request-panel';
import Desc from './desc';
import Header from './header';
import RequestList from './request-list';

const Home = () => {
  return (
    <>
      <Header></Header>
      <Desc></Desc>
      <div>
        <RequestList></RequestList>
        {/* <RequestPanel></RequestPanel> */}
      </div>
    </>
  );
};

export default Home;
