import React, { useState } from 'react';
import LocalizationProvider from './contexts/LocalizationProvider';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import DacEditor from './components/dac-editor/DacEditor';
import Properties from './components/Properties';
import DiagramWindow from './components/DiagramWindow';

const App = () => {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);

  const handleToggleLeft = () => {
    setLeftSidebarVisible(prevState => !prevState);
  };

  const handleToggleRight = () => {
    setRightSidebarVisible(prevState => !prevState);
  };

  return (
    <LocalizationProvider>
      <Header onToggleLeft={handleToggleLeft} onToggleRight={handleToggleRight} />
      <div className="main-content">
        <Sidebar isVisible={leftSidebarVisible} position="left">
          <DacEditor onClose={handleToggleLeft} />
        </Sidebar>
        <main className="central-content">
          <DiagramWindow />
        </main>
        <Sidebar isVisible={rightSidebarVisible} position="right">
          <Properties property="Nothing to see here, yet!" />
        </Sidebar>
      </div>
    </LocalizationProvider>
  );
};

export default App;
