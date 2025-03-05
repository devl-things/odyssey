import React, { useCallback, useEffect, useMemo } from 'react';
import {
    ReactFlow, MiniMap, Node, Edge, useNodesState, useEdgesState, addEdge
    // Controls,
    // Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DiagramModel from '../../data/odyssey-protocol/DiagramModel';
import { MapToNodes, MapToDiagramNodes, MapToDiagramNode } from '../../data/mappers/NodeMapper';
import { MapToEdges, MapToDiagramEdges, MapToDiagramEdge } from '../../data/mappers/EdgeMapper';
import { logInDev } from '../../util/logging';
import Toolbar from "../toolbar/Toolbar";
import './DiagramWindow.scss';
import OdysseyData from '../../data/odyssey-protocol/OdysseyData';
import DiagramNode from '../../data/odyssey-protocol/DiagramNode';
import DiagramEdge from '../../data/odyssey-protocol/DiagramEdge';
import OdysseyNodeTypes from '../diagram-nodes/OdysseyNodeTypes';

interface DiagramWindowProps {
    dac?: DiagramModel,
    onEditDiagram: (diagram: DiagramModel) => void;
    onNodeSelect: (node: DiagramNode) => void;
    onEdgeSelect: (edge: DiagramEdge) => void;
}

const DiagramWindow: React.FC<DiagramWindowProps> = ({ dac = null, onEditDiagram, onNodeSelect, onEdgeSelect }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node<OdysseyData>>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const nodeTypes = useMemo(() => (OdysseyNodeTypes), []);

    logInDev("[DiagramWindow] nodeTypes ", nodeTypes);

    useEffect(() => {
        logInDev("[DiagramWindow] Diagram from editor ", dac);
        if (dac) {
            setNodes(MapToNodes(dac.nodes));
            setEdges(MapToEdges(dac.edges));
        }
    }, [dac]);


    const handleExportToEditor = useCallback(() => {
        let diagram: DiagramModel = {
            nodes: MapToDiagramNodes(nodes),
            edges: MapToDiagramEdges(edges)
        };

        onEditDiagram(diagram);
    }, [nodes, edges]);

    const handleOnNodeClick = (event: React.MouseEvent, node: Node<OdysseyData>) => {
        if (node && onNodeSelect) {
            onNodeSelect(MapToDiagramNode(node));
        }
    };

    const handleOnEdgeClick = (event: React.MouseEvent, edge: Edge) => {
        if (edge && onEdgeSelect) {
            onEdgeSelect(MapToDiagramEdge(edge));
        }
    };

    const handleOnDownloadPdf = useCallback(() => {
        //TODO #18
        logInDev("Export in PDF");
    }, []);

    const handleOnDownloadSvg = useCallback(() => {
        //TODO #18
        logInDev("Export in SVG");
    }, []);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]);

    return (
        <div className="diagram-window">
            <Toolbar onFormat={handleExportToEditor} onDownloadPdf={handleOnDownloadPdf} onDownloadSvg={handleOnDownloadSvg} />
            <div className="diagram" >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={handleOnNodeClick}
                    onEdgeClick={handleOnEdgeClick}
                    nodeTypes={nodeTypes}
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