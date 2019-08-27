import React from 'react';
import CARTOMap from './CARTOMap';
import CARTOVLMap from './CARTOVLMap';
import Header from './layout/Header'
import RightBar from './layout/RightBar'
import LeftBar from './layout/LeftBar'
import BottomBar from './layout/BottomBar'
import Panel from './layout/Panel'
import '@carto/airship-style';


const Page = () => (
  <as-responsive-content>
    <body className="as-app-body as-app">
      <Header />
      <div className="as-content">
        <main className="as-main">
          <div className="as-map-area">
            <CARTOMap />
            <Panel
              vertical='top'
              horizontal='left'
              background=''
              name='Controls'
            />
          </div>
          <BottomBar
            background=''
            name='Bottom'
          />
        </main>
        <RightBar
          size='l'
          background=''
          name='Right'
        />
        <LeftBar
          size='s'
          background=''
          name='Left'
        />
      </div>
    </body>
  </as-responsive-content>
);

export default Page;
