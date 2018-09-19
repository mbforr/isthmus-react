import React from 'react';
import CARTOMapNew from './CARTOMapNew';
import Header from './Header'
import RightBar from '../components/RightBar'
import '@carto/airship-style';

const Page = () => (
  <div className="as-app">

  <Header />

  <main className="as-app-content">

    <div className="as-map-wrapper">
      <div className="as-map">
        <CARTOMapNew />
      </div>
    </div>

    <aside className="as-sidebar as-sidebar--l as-sidebar--right">
      <div className="as-m--24">
        <RightBar />
      </div>
    </aside>



  </main>
  </div>
);

export default Page;
