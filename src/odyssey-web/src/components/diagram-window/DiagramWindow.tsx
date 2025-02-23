import React, { useCallback, useEffect } from 'react';
import {
    ReactFlow,
    // MiniMap,
    // Controls,
    // Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Toolbar from "../toolbar/Toolbar";
import './DiagramWindow.scss';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'uno' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    { id: '3', position: { x: 200, y: 100 }, data: { label: '3' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

interface DiagramWindowProps {
    dac?: string,
    onEditDiagramInEditor: (diagram: string) => void;
}

const DiagramWindow: React.FC<DiagramWindowProps> = ({ dac = "", onEditDiagramInEditor }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        console.log("[DiagramWindow] Diagram from editor" + dac)
    }, [dac]);

    const handleExportToEditor = () => {
        onEditDiagramInEditor(JSON.stringify(initialNodes, null, 2));
    };

    const handleDownloadPdf = () => {
        console.log("Export in PDF");
    };

    const handleDownloadSvg = () => {
        console.log("Export in SVG");
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
                >
                    {/* <Controls /> */}
                    {/* <MiniMap /> */}
                    {/* <Background variant="dots" gap={12} size={1} /> */}
                </ReactFlow>
            </div>
        </div>
    );
};

export default DiagramWindow;