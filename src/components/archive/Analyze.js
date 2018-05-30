import React from 'react';
import RevealMap from './RevealMap';
import RightBar from './RightBar';
import BottomBar from './BottomBar';

const Analyze = () => (
  <div>
    <div className="smallmap">
      <RevealMap />
    </div>
    <RightBar />
    <BottomBar />
  </div>
);


export default Analyze;
