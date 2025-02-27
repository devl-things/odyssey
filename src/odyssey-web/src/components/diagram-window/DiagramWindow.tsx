import React, { useCallback, useEffect } from 'react';
import {
    ReactFlow, MiniMap, Node, Edge, useNodesState, useEdgesState, addEdge
    // Controls,
    // Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DiagramModel from '../../data/odyssey-protocol/DiagramModel';
import { mapToNodes, mapToDiagramNodes } from '../../data/mappers/nodeMapper';
import { mapToEdges, mapToDiagramEdges } from '../../data/mappers/edgeMapper';
import { logInDev } from '../../util/logging';
import Toolbar from "../toolbar/Toolbar";
import './DiagramWindow.scss';
import OdysseyData from '../../data/mappers/OdysseyData';
import { Layer, NodeType } from '../../data/odyssey-protocol/Enums';

const initialNodes: Node<OdysseyData>[] = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'uno', name: 'uno', type: NodeType.Component, layer: Layer.Context } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'due', name: 'due', type: NodeType.Component, layer: Layer.Context } },
    { id: '3', position: { x: 200, y: 100 }, data: { label: 'tre', name: 'tre', type: NodeType.Component, layer: Layer.Context } },
];
const initialNodesII: Node<OdysseyData>[] = [
    { id: "dog", type: "default", position: { x: 0, y: 0 }, data: { label: "Dog", name: "Dog", type: NodeType.Component, layer: Layer.Context, icon: "https://robohash.org/dog" } },
    { id: "vixen", type: "default", position: { x: 200, y: 100 }, data: { label: "Vixen", name: "Vixen", type: NodeType.Component, layer: Layer.Context, icon: "https://robohash.org/vixen" } },
    { id: 'bee', type: "default", position: { x: 400, y: 200 }, data: { label: "Bee", name: "Bee", type: NodeType.Component, layer: Layer.Context, icon: "https://robohash.org/bee" }, style: { width: 200, height: 200 } },
    { id: 'bee_ham', type: "default", position: { x: 500, y: 200 }, parentId: 'bee', data: { label: "Bee base", name: "Bee base", type: NodeType.Component, layer: Layer.Context, icon: "https://robohash.org/ham" }, style: { width: 200, height: 200 } },
    { id: "wasp", type: "default", position: { x: 600, y: 300 }, data: { label: "Wasp", name: "Wasp", type: NodeType.Component, layer: Layer.Context, "icon": "https://robohash.org/wasp" } },
    { id: "wasp_base", type: "default", position: { x: 600, y: 300 }, parentId: 'wasp', data: { label: "Wasp", name: "Wasp", type: NodeType.Component, layer: Layer.Context, "icon": "https://robohash.org/base" } }
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];
const initialEdgesII: Edge[] = [{ id: "1", source: 'bee', target: "dog" },
{ id: "2", source: "bee", target: "vixen" },
{ id: "3", source: "vixen", target: "dog" },
{ id: "4", source: "bee", target: "wasp" },
{ id: "6", source: "bee-ham", target: "wasp_base" },
{ id: "5", source: "wasp", target: "vixen" }];

interface DiagramWindowProps {
    dac?: DiagramModel,
    onEditDiagram: (diagram: DiagramModel) => void;
}

const DiagramWindow: React.FC<DiagramWindowProps> = ({ dac = null, onEditDiagram }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesII);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesII);

    useEffect(() => {
        logInDev("[DiagramWindow] Diagram from editor ", dac);
        if (dac) {
            setNodes(mapToNodes(dac.nodes));
            setEdges(mapToEdges(dac.edges));
        }
    }, [dac]);


    const handleExportToEditor = () => {
        // Ensure that DiagramModel is initialized properly
        let diagram: DiagramModel = {
            nodes: mapToDiagramNodes(nodes), // Ensure this function returns the correct type
            edges: mapToDiagramEdges(edges) // Provide a default empty array if edges are not needed
        };

        onEditDiagram(diagram);
    };

    const handleOnNodeClick = (event, node) => console.log('click node', node);

    const handleDownloadPdf = () => {
        logInDev("Export in PDF");
    };

    const handleDownloadSvg = () => {
        logInDev("Export in SVG");
    };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div className="diagram-window">
            <Toolbar onFormat={handleExportToEditor} onDownloadPdf={handleDownloadPdf} onDownloadSvg={handleDownloadSvg} />
            <div className="diagram" >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={handleOnNodeClick}
                >
                    <MiniMap />
                    {/* <Controls /> */}
                    {/* <Background variant="dots" gap={12} size={1} /> */}
                </ReactFlow>
            </div>
        </div>
    );
};

export default DiagramWindow;