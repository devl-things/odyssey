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

export const mapToDiagramEdges = (diagramEdges: Edge[]): DiagramEdge[] => {
    const reactFlowEdges: DiagramEdge[] = [];
    if (diagramEdges) {
        diagramEdges.forEach((diagramEdge: DiagramEdge) => {
            reactFlowEdges.push(mapToDiagramEdge(diagramEdge));
        });
    }
    return reactFlowEdges;
};

export const mapToDiagramEdge = (diagramEdge: Edge): DiagramEdge => {
    return {
        id: diagramEdge.id,
        source: diagramEdge.source,
        target: diagramEdge.target,
        type: EdgeType.Relationship
    };
};