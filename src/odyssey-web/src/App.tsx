import React, { useState } from 'react';
import LocalizationProvider from './contexts/LocalizationProvider';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import DacEditor from './components/dac-editor/DacEditor';
import Properties from './components/Properties';
import DiagramWindow from './components/diagram-window/DiagramWindow';

const App: React.FC = () => {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(false);
  const [dacInEditor, setDacInEditor] = useState('');
  const [dac, setDac] = useState('');

  const handleToggleLeft = () => {
    setLeftSidebarVisible(prevState => !prevState);
  };

  const handleToggleRight = () => {
    setRightSidebarVisible(prevState => !prevState);
  };

  const handleDiagramLoad = (diagram: string) => {
    setDac(diagram);
    console.log("[App] Diagram from editor" + diagram)
  };

  const handleEditDiagramInEditor = (diagram: string) => {
    setDacInEditor(diagram);
    console.log("[App] Diagram from react flow " + diagram)
  };

  return (
    <LocalizationProvider>
      <Header onToggleLeft={handleToggleLeft} onToggleRight={handleToggleRight} />
      <div className="main-content">
        <Sidebar isVisible={leftSidebarVisible} position="left">
          <DacEditor dac={dacInEditor} onClose={handleToggleLeft} onLoad={handleDiagramLoad} />
        </Sidebar>
        <DiagramWindow dac={dac} onEditDiagramInEditor={handleEditDiagramInEditor} />
        <Sidebar isVisible={rightSidebarVisible} position="right">
          <Properties property="Nothing to see here, yet!" />
        </Sidebar>
      </div>
    </LocalizationProvider >
  );
};

export default App;
