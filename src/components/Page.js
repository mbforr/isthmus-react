import React from 'react';
import CARTOMapNew from './CARTOMapNew';
import Header from './Header'
import RightBar from './layout/RightBar'
import LeftBar from './layout/LeftBar'
import BottomBar from '../components/layout/BottomBar'
import '@carto/airship-style';

const Page = () => (
  <body className="as-app">
    <Header />
    <div className="as-content">
      <main className="as-main">
        <div className="as-map-area">
          <CARTOMapNew />
            <div className="as-map-panels">
            <div className="as-panel as-panel--top as-panel--left">
              <div className="as-panel__element as-p--32 as-bg--support-02">
                  <p className="as-body"> ADD IN PROPERTIES FOR POSITION </p>
                </div>
            </div>
            </div>
        </div>
        <BottomBar />
      </main>
      <RightBar
        size='l'
      />
      <LeftBar
        size='s'
      />
    </div>
  </body>
);

export default Page;
