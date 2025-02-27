import React, { useState } from 'react';
import LocalizationProvider from './contexts/LocalizationProvider';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import DacEditor from './components/dac-editor/DacEditor';
import Properties from './components/Properties';
import DiagramWindow from './components/diagram-window/DiagramWindow';
import DiagramModel from './data/odyssey-protocol/DiagramModel';
import { logInDev } from './util/logging';

const App: React.FC = () => {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(false);
  const [dacInEditor, setDacInEditor] = useState(null);
  const [dac, setDac] = useState(null);

  const handleToggleLeft = () => {
    setLeftSidebarVisible(prevState => !prevState);
  };

  const handleToggleRight = () => {
    setRightSidebarVisible(prevState => !prevState);
  };

  const handleDiagramLoad = (diagram: DiagramModel) => {
    setDac(diagram);
    logInDev("[App] Diagram from editor ", diagram);
  };

  const handleEditDiagramInEditor = (diagram: DiagramModel) => {
    setDacInEditor(diagram);
    logInDev("[App] Diagram from react flow ", diagram);
  };

  return (
    <LocalizationProvider>
      <Header onToggleLeft={handleToggleLeft} onToggleRight={handleToggleRight} />
      <div className="main-content">
        <Sidebar isVisible={leftSidebarVisible} position="left">
          <DacEditor dac={dacInEditor} onClose={handleToggleLeft} onLoad={handleDiagramLoad} />
        </Sidebar>
        <DiagramWindow dac={dac} onEditDiagram={handleEditDiagramInEditor} />
        <Sidebar isVisible={rightSidebarVisible} position="right">
          <Properties property="Nothing to see here, yet!" />
        </Sidebar>
      </div>
    </LocalizationProvider >
  );
};

export default App;
