// src/App.js
import React, { useState } from 'react';
import Header from './components/Layout/Header';
import SidebarLeft from './components/Layout/SidebarLeft';
import SidebarRight from './components/Layout/SidebarRight';

const App = () => {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
  const [leftSidebarContent, setLeftSidebarContent] = useState(<p>Loading Left Content...</p>);
  const [rightSidebarContent, setRightSidebarContent] = useState(<p>Loading Right Content...</p>);

  const toggleLeftSideVisibility = () => {
    setLeftSidebarVisible(prevState => !prevState);
  };

  const toggleRightSideVisibility = () => {
    setRightSidebarVisible(prevState => !prevState);
  };

  // Example of dynamically updating content

  const fetchRightSidebarContent = () => {
    setRightSidebarContent();
  };

  // Simulate content change after component mounts or on an action
  React.useEffect(() => {
    fetchRightSidebarContent();
  }, []);

  return (
    <div className="layout">
      <Header onToggleLeft={toggleLeftSideVisibility} onToggleRight={toggleRightSideVisibility} />
      <div className="main-content">
        <SidebarLeft isVisible={leftSidebarVisible} >
          <p>This is the dynamic content for the left sidebar.</p>
        </SidebarLeft>
        <main className="central-content">
          <h2>Main Content Area</h2>
          <p>This is the central content area of the page.</p>
        </main>
        <SidebarRight isVisible={rightSidebarVisible}>
          <p>This is the dynamic content for the right sidebar.</p>
        </SidebarRight>
      </div>
    </div>
  );
};

export default App;
