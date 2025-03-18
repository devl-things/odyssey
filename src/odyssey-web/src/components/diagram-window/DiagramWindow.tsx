import React, { useCallback, useEffect, useMemo } from 'react';
import {
    ReactFlow, MiniMap, Node, Edge, useNodesState, useEdgesState, addEdge,
    Background
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
import { ApiMethod } from '../../data/odyssey-protocol/Enums';

interface DiagramWindowProps {
    dac?: DiagramModel,
    onEditDiagram: (diagram: DiagramModel) => void;
    onNodeSelect: (node: DiagramNode) => void;
    onEdgeSelect: (edge: DiagramEdge) => void;
}

const DiagramWindow: React.FC<DiagramWindowProps> = ({ dac = null, onEditDiagram, onNodeSelect, onEdgeSelect }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const nodeTypes = useMemo(() => (OdysseyNodeTypes), []);

    logInDev("[DiagramWindow] nodeTypes ", nodeTypes);

    useEffect(() => {
        logInDev("[DiagramWindow] Diagram from editor ", dac);
        // if (dac) {
        //     setNodes(MapToNodes(dac.nodes));
        //     setEdges(MapToEdges(dac.edges));
        // }

        //width is 8.36 per letter + 13 + 5 //+ max 65
        setNodes([
            {
                id: "20",
                type: "api",
                data: {
                    method: ApiMethod.Get,
                    url: '/withoutSpecifics',
                    style: {
                        //width: 30 * 8.5 + 32 + 30,
                        //height: 280
                    }
                },
                position: { x: 400, y: 50 },
                //style: { width: 30 * 8.5 + 32 + 30, height: 280 },
            },
            {
                id: "21",
                type: "component",
                data: {
                    //method: ApiMethod.Get,
                    name: 'DOG',
                    //url: '/withoutSpecifics',
                    style: {
                        //width: 30 * 8.5 + 32 + 30,
                        //height: 280
                    }
                },
                position: { x: 600, y: 50 },
                //style: { width: 30 * 8.5 + 32 + 30, height: 280 },
            },
            {
                id: "8",
                type: "api",
                data: {
                    method: ApiMethod.Get,
                    url: '/withSpecificswithSpecificswithSpecificswithSpecificswithSpecifics',
                    style: {
                        width: 30 * 8.5 + 32 + 30,
                        height: 280
                    }
                },
                position: { x: 10, y: 50 },
                style: { width: 30 * 8.5 + 32 + 30, height: 280 },
            },
            {
                id: "1",
                type: "apiFacet",
                data: { direction: 'request' },
                parentId: "8",
                position: { x: 15, y: 60 },
                style: { width: 30 * 8.5 + 32, height: 110 },
                extent: 'parent',
                expandParent: true
            },
            {
                id: "2",
                type: "field",
                data: { name: "FieldName", type: "datetime", primaryKey: true },
                parentId: "1",
                position: { x: 3, y: 23 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true
            },
            {
                id: "3",
                type: "field",
                data: { name: "FieldNameFieldNameFieldNameFie", type: "int", primaryKey: false },
                parentId: "1",
                position: { x: 3, y: 50 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true
            },
            {
                id: "4",
                type: "field",
                data: { name: "FieldNameF", type: "int", primaryKey: false },
                parentId: "1",
                position: { x: 3, y: 77 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true
            },
            {
                id: "10",
                type: "apiFacet",
                data: { direction: 'response' },
                parentId: "8",
                position: { x: 15, y: 165 },
                style: { width: 30 * 8.5 + 32, height: 110 },
                extent: 'parent',
                expandParent: true
            },
            {
                id: "11",
                type: "field",
                data: { name: "FieldName", type: "datetime", primaryKey: true },
                parentId: "10",
                position: { x: 3, y: 23 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true
            },
            {
                id: "12",
                type: "field",
                data: { name: "FieldNameFieldNameFieldNameFie", type: "int", primaryKey: false },
                parentId: "10",
                position: { x: 3, y: 50 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true
            },
            {
                id: "13",
                type: "field",
                data: { name: "FieldNameF", type: "int", primaryKey: false },
                parentId: "10",
                position: { x: 3, y: 77 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true
            },
        ]);

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