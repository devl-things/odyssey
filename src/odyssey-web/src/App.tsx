import React, { useCallback, useReducer, useState } from 'react';
import LocalizationProvider from './contexts/LocalizationProvider';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import DacEditor from './components/dac-editor/DacEditor';
import Properties from './components/properties/Properties';
import DiagramWindow from './components/diagram-window/DiagramWindow';
import DiagramModel from './data/odyssey-protocol/DiagramModel';
import DiagramNode from './data/odyssey-protocol/DiagramNode';
import DiagramEdge from './data/odyssey-protocol/DiagramEdge';
import { NodeType, Layer } from './data/odyssey-protocol/Enums';
import DiagramModelReducer, { DiagramModelActionTypes } from './reducers/DiagramModelReducer';
import { Node, Edge } from '@xyflow/react';
import OdysseyData from './data/odyssey-protocol/OdysseyData';
import { logInDev } from './util/logging';
import { MapToDiagramNodes } from './data/mappers/NodeMapper';
import { MapToDiagramEdges } from './data/mappers/EdgeMapper';

const initialNodesII: Node<OdysseyData>[] = [
  { id: "dog", type: "default", position: { x: 0, y: 0 }, data: { label: "Dog", name: "Dog", type: NodeType.Component, layer: Layer.Context, icon: "https://robohash.org/dog" } },
  { id: "vixen", type: "default", position: { x: 200, y: 100 }, data: { label: "Vixen", name: "Vixen", type: NodeType.Component, layer: Layer.Context, icon: "https://robohash.org/vixen" } },
  { id: 'bee', type: "default", position: { x: 400, y: 200 }, data: { label: "Bee", name: "Bee", type: NodeType.Component, layer: Layer.Context, icon: "https://robohash.org/bee" }, style: { width: 200, height: 200 } },
  { id: 'bee_ham', type: "default", position: { x: 500, y: 200 }, parentId: 'bee', data: { label: "Bee base", name: "Bee base", type: NodeType.Component, layer: Layer.Context, icon: "https://robohash.org/ham" }, style: { width: 200, height: 200 } },
  { id: "wasp", type: "default", position: { x: 600, y: 300 }, data: { label: "Wasp", name: "Wasp", type: NodeType.Component, layer: Layer.Context, "icon": "https://robohash.org/wasp" } },
  { id: "wasp_base", type: "default", position: { x: 600, y: 300 }, parentId: 'wasp', data: { label: "Wasp", name: "Wasp", type: NodeType.Component, layer: Layer.Context, "icon": "https://robohash.org/base" } }
];

const initialEdgesII: Edge[] = [{ id: "1", source: 'bee', target: "dog" },
{ id: "2", source: "bee", target: "vixen" },
{ id: "3", source: "vixen", target: "dog" },
{ id: "4", source: "bee", target: "wasp" },
{ id: "6", source: "bee-ham", target: "wasp_base" },
{ id: "5", source: "wasp", target: "vixen" }];

const initialDiagram: DiagramModel = {
  nodes: MapToDiagramNodes(initialNodesII),
  edges: MapToDiagramEdges(initialEdgesII),
};

const App: React.FC = () => {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState<boolean>(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState<boolean>(true);
  const [nodeProperties, setNodeProperties] = useState<DiagramNode | null>(null);
  const [edgeProperties, setEdgeProperties] = useState<DiagramEdge | null>(null);

  const [dac, dispatchDac] = useReducer(DiagramModelReducer, initialDiagram);
  const [dacInEditor, dispatchDacInEditor] = useReducer(DiagramModelReducer, initialDiagram);

  const handleToggleLeft = useCallback(() => {
    setLeftSidebarVisible(prevState => !prevState);
  }, []);

  const handleToggleRight = useCallback(() => {
    setRightSidebarVisible(prevState => !prevState);
  }, []);

  const handleOnLoad = useCallback((diagram: DiagramModel) => {
    dispatchDac({ type: DiagramModelActionTypes.SET_DIAGRAM, payload: diagram });
    logInDev("[App] handleOnLoad ", diagram);
  }, []);

  const handleOnEditDiagram = useCallback((diagram: DiagramModel) => {
    dispatchDacInEditor({ type: DiagramModelActionTypes.SET_DIAGRAM, payload: diagram });
    logInDev("[App] handleOnEditDiagram ", diagram);
  }, []);

  const handleOnNodeChange = (node: DiagramNode) => {
    dispatchDac({ type: DiagramModelActionTypes.MODIFY_NODE, payload: node });
    logInDev("[App] handleOnNodeChange ", node);
  };

  const handleOnEdgeChange = (edge: DiagramEdge) => {
    dispatchDac({ type: DiagramModelActionTypes.MODIFY_EDGE, payload: edge });
    logInDev("[App] handleOnEdgeChange ", edge);
  };

  const handleOnNodeSelect = (node: DiagramNode) => {
    setNodeProperties(node);
    setEdgeProperties(null);
    setRightSidebarVisible(true);
    logInDev("[App] handleOnNodeSelect ", node);
  };

  const handleOnEdgeSelect = (edge: DiagramEdge) => {
    setNodeProperties(null);
    setEdgeProperties(edge);
    setRightSidebarVisible(true);
    logInDev("[App] handleOnEdgeSelect ", edge);
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
          <Properties node={nodeProperties} onNodeChange={handleOnNodeChange}
            edge={edgeProperties} onEdgeChange={handleOnEdgeChange}
            onClose={handleToggleRight} />
        </Sidebar>
      </div>
    </LocalizationProvider >
  );
};

export default App;
