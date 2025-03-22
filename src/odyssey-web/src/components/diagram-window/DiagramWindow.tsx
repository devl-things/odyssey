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
                id: "50",
                type: "blob",
                data: {
                    name: 'Blob',
                    url: '10.123.123.123',
                    style: {
                        //width: 30 * 8.5 + 32 + 30,
                        //height: 60 + 30 + 4 + 27 + 27 + 14
                    }
                },
                position: { x: 10, y: 5 },
                style: {
                    //width: 30 * 8.5 + 28 + 20 + 30,
                    //height: 60 + 30 + 4 + 27 + 27 + 14
                },
            },
            {
                id: "40",
                type: "cache",
                data: {
                    name: 'Memory',
                    url: '10.123.123.123',
                    style: {
                        //width: 30 * 8.5 + 32 + 30,
                        //height: 60 + 30 + 4 + 27 + 27 + 14
                    }
                },
                position: { x: 10, y: 70 },
                style: {
                    width: 30 * 8.5 + 28 + 20 + 30,
                    //height: 60 + 30 + 4 + 27 + 27 + 14
                },
            },
            {
                id: "30",
                type: "db",
                data: {
                    name: 'DbName',
                    url: '10.123.123.123',
                    style: {
                        //width: 30 * 8.5 + 32 + 30,
                        height: 60 + 30 + 4 + 27 + 27 + 14
                    }
                },
                position: { x: 10, y: 200 },
                style: {
                    width: 30 * 8.5 + 28 + 20 + 30,
                    height: 60 + 30 + 4 + 27 + 27 + 14
                },
            },
            {
                id: "31",
                type: "table",
                data: {
                    name: 'Table2Table2Table2Table2Table2Table2Table2',
                    style: {
                        //width: 30 * 8.5 + 28 + 20,
                        height: 30 + 4 + 27 + 27
                    }
                },
                parentId: "30",
                position: { x: 15, y: 60 },
                style: {
                    width: 30 * 8.5 + 28 + 20,
                    height: 30 + 4 + 27 + 27
                },
                extent: 'parent',
                expandParent: true
            },
            {
                id: "32",
                type: "field",
                data: { name: "ColumnName", type: "datetime", isRequired: true },
                parentId: "31",
                position: { x: 10, y: 30 },
                style: { width: 11 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true,
                draggable: false
            },
            {
                id: "33",
                type: "field",
                data: { name: "ColumnName2", type: "datetime", },
                parentId: "31",
                position: { x: 10, y: 30 + 27 },
                style: { width: 11 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true,
                draggable: false
            },
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
                position: { x: 400, y: 500 },
                //style: { width: 30 * 8.5 + 32 + 30, height: 280 },
            },
            {
                id: "21",
                type: "component",
                data: {
                    name: 'DOGEXTRALARGE NAME so to see how it is',
                    icon: 'https://robohash.org/dog?size=400x200',
                    //icon: 'nevaljala',
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
                position: { x: 10, y: 500 },
                style: { width: 30 * 8.5 + 32 + 30, height: 280 },
            },
            {
                id: "1",
                type: "apiFacet",
                data: { direction: 'request' },
                parentId: "8",
                position: { x: 15, y: 60 },
                style: { width: 30 * 8.5 + 32, height: 23 + 27 + 27 + 27 },
                extent: 'parent',
                expandParent: true,
                draggable: false
            },
            {
                id: "2",
                type: "field",
                data: { name: "FieldName", type: "datetime", isPrimaryKey: true },
                parentId: "1",
                position: { x: 3, y: 23 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true,
                draggable: false
            },
            {
                id: "3",
                type: "field",
                data: { name: "FieldNameFieldNameFieldNameFie", type: "int", isPrimaryKey: false },
                parentId: "1",
                position: { x: 3, y: 50 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true,
                draggable: false
            },
            {
                id: "4",
                type: "field",
                data: { name: "FieldNameF", type: "int", isPrimaryKey: false },
                parentId: "1",
                position: { x: 3, y: 77 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true,
                draggable: false
            },
            {
                id: "10",
                type: "apiFacet",
                data: { direction: 'response' },
                parentId: "8",
                position: { x: 15, y: 60 + 23 + 27 + 27 + 27 },
                style: { width: 30 * 8.5 + 32, height: 23 + 27 + 27 + 27 },
                extent: 'parent',
                expandParent: true,
                draggable: false
            },
            {
                id: "11",
                type: "field",
                data: { name: "FieldName", type: "datetime", isPrimaryKey: true },
                parentId: "10",
                position: { x: 3, y: 23 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true,
                draggable: false
            },
            {
                id: "12",
                type: "field",
                data: { name: "FieldNameFieldNameFieldNameFie", type: "int", isPrimaryKey: false },
                parentId: "10",
                position: { x: 3, y: 50 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true,
                draggable: false
            },
            {
                id: "13",
                type: "field",
                data: { name: "FieldNameF", type: "int", isPrimaryKey: false },
                parentId: "10",
                position: { x: 3, y: 77 },
                style: { width: 30 * 8.5 + 28 },
                extent: 'parent',
                expandParent: true,
                draggable: false
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