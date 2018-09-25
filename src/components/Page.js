import React from 'react';
import CARTOMapNew from './CARTOMapNew';
import Header from './Header'
import RightBar from './layout/RightBar'
import LeftBar from './layout/LeftBar'
import BottomBar from '../components/layout/BottomBar'
import '@carto/airship-style';

const Page = () => (
  <div className="as-app">

  <Header />

  <main className="as-app-content as-main">

    <div className="as-map-wrapper">
      <div className="as-map-area">
        <CARTOMapNew />

      </div>
      <BottomBar
      />
    </div>
    <RightBar
      size='l'
    />
    <LeftBar
      size='s'
    />



  </main>
  </div>
);

export default Page;
