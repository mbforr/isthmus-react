import React from 'react';
import CARTOMapNew from './CARTOMapNew';
import Header from './Header'
import RightBar from '../components/RightBar'
import LeftBar from '../components/LeftBar'
import BottomBar from '../components/layout/BottomBar'
import '@carto/airship-style';

const Page = () => (
  <div className="as-app">

  <Header />

  <main className="as-app-content">

    <div className="as-map-wrapper">
      <div className="as-map-area">
        <CARTOMapNew />

      </div>
      <BottomBar />
    </div>
    <RightBar />
    <LeftBar />



  </main>
  </div>
);

export default Page;
