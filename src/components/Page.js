import React from 'react';
import CARTOMapNew from './CARTOMapNew';
import Header from './Header'
import RightBar from '../components/RightBar'
import airship from '@carto/airship-style'



//Header should go in here

const Page = () => (
  <div className="as-app">

  <Header />

  <main className="as-app-content">

    <div className="as-map-wrapper">
      <div className="as-map">
        <CARTOMapNew />
      </div>
    </div>



    <aside className="as-sidebar--l as-sidebar--right">
      <div class="as-container as-m--16">
        <RightBar />
      </div>
    </aside>



  </main>
  </div>
);

export default Page;
