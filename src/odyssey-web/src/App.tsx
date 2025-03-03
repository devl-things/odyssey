import React, { useState } from 'react';
import LocalizationProvider from './contexts/LocalizationProvider';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import DacEditor from './components/dac-editor/DacEditor';
import Properties from './components/properties/Properties';
import DiagramWindow from './components/diagram-window/DiagramWindow';
import DiagramModel from './data/odyssey-protocol/DiagramModel';
import { logInDev } from './util/logging';
import DiagramNode from './data/odyssey-protocol/DiagramNode';
import DiagramEdge from './data/odyssey-protocol/DiagramEdge';

const App: React.FC = () => {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState<boolean>(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState<boolean>(true);
  const [dacInEditor, setDacInEditor] = useState<DiagramModel | null>(null);
  const [dac, setDac] = useState<DiagramModel | null>(null);
  const [nodeProperties, setNodeProperties] = useState<DiagramNode | null>(null);
  const [edgeProperties, setEdgeProperties] = useState<DiagramEdge | null>(null);

  const handleToggleLeft = () => {
    setLeftSidebarVisible(prevState => !prevState);
  };

  const handleToggleRight = () => {
    setRightSidebarVisible(prevState => !prevState);
  };

  const handleOnLoad = (diagram: DiagramModel) => {
    setDac(diagram);
    logInDev("[App] Diagram from editor ", diagram);
  };

  const handleOnEditDiagram = (diagram: DiagramModel) => {
    setDacInEditor(diagram);
    logInDev("[App] Diagram from react flow ", diagram);
  };

  const handleOnNodeSelect = (node: any) => {
    setNodeProperties(node.data);
    setEdgeProperties(null);
    setRightSidebarVisible(true);
    logInDev("[App] Diagram from react flow ", node);
  };

  const handleOnEdgeSelect = (edge: any) => {
    setNodeProperties(null);
    setEdgeProperties(edge);
    setRightSidebarVisible(true);
    logInDev("[App] Diagram from react flow ", edge);
  };

  return (
    <LocalizationProvider>
      <Header onToggleLeft={handleToggleLeft} onToggleRight={handleToggleRight} />
      <div className="main-content">
        <Sidebar isVisible={leftSidebarVisible} position="left">
          <DacEditor dac={dacInEditor} onClose={handleToggleLeft} onLoad={handleOnLoad} />
        </Sidebar>
        <DiagramWindow dac={dac} onEditDiagram={handleOnEditDiagram} onNodeSelect={handleOnNodeSelect} onEdgeSelect={handleOnEdgeSelect} />
        <Sidebar isVisible={rightSidebarVisible} position="right">
          <Properties node={nodeProperties} edge={edgeProperties} onClose={handleToggleRight} />
        </Sidebar>
      </div>
    </LocalizationProvider >
  );
};

export default App;
