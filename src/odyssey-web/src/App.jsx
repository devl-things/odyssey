import React, { useState } from 'react';
import LocalizationProvider from './contexts/LocalizationProvider';
import Header from './components/header/Header';
import SidebarLeft from './components/Layout/SidebarLeft';
import SidebarRight from './components/Layout/SidebarRight';
import DacInput from './components/DacInput';
import Properties from './components/Properties';
import DiagramWindow from './components/DiagramWindow';

const App = () => {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);

  const toggleLeftSideVisibility = () => {
    setLeftSidebarVisible(prevState => !prevState);
  };

  const toggleRightSideVisibility = () => {
    setRightSidebarVisible(prevState => !prevState);
  };

  return (
    <LocalizationProvider>
      <Header onToggleLeft={toggleLeftSideVisibility} onToggleRight={toggleRightSideVisibility} />
      <div className="main-content">
        <SidebarLeft isVisible={leftSidebarVisible} >
          <DacInput />
        </SidebarLeft>
        <main className="central-content">
          <DiagramWindow />
        </main>
        <SidebarRight isVisible={rightSidebarVisible}>
          <Properties property="Nothing to see here, yet!" />
        </SidebarRight>
      </div>
    </LocalizationProvider>
  );
};

export default App;
