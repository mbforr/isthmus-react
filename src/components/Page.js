import React from 'react';
import CARTOMapNew from './CARTOMapNew';
import Header from './layout/Header'
import RightBar from './layout/RightBar'
import LeftBar from './layout/LeftBar'
import BottomBar from './layout/BottomBar'
import Panel from './layout/Panel'
import '@carto/airship-style';

const Page = () => (
  <body className="as-app">
    <Header />
    <div className="as-content">
      <main className="as-main">
        <div className="as-map-area">
          <CARTOMapNew />
          <Panel
            vertical='top'
            horizontal='left'
          />
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
