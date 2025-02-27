import { Edge } from '@xyflow/react';
import DiagramEdge from "../odyssey-protocol/DiagramEdge";
import { EdgeType } from '../odyssey-protocol/Enums';

export const mapToEdges = (diagramEdges: DiagramEdge[]): Edge[] => {
    const reactFlowEdges: Edge[] = [];
    if (diagramEdges) {
        diagramEdges.forEach((diagramEdge: DiagramEdge) => {
            reactFlowEdges.push(mapToEdge(diagramEdge));
        });
    }
    return reactFlowEdges;
};

export const mapToEdge = (diagramEdge: DiagramEdge): Edge => {
    return {
        id: diagramEdge.id,
        source: diagramEdge.source,
        target: diagramEdge.target,
        zIndex: 2000
    };
};

export const mapToDiagramEdges = (edges: Edge[]): DiagramEdge[] => {
    const diagramEdges: DiagramEdge[] = [];
    if (edges) {
        edges.forEach((diagramEdge: DiagramEdge) => {
            diagramEdges.push(mapToDiagramEdge(diagramEdge));
        });
    }
    return diagramEdges;
};

export const mapToDiagramEdge = (edge: Edge): DiagramEdge => {
    return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: EdgeType.Relationship
    };
};