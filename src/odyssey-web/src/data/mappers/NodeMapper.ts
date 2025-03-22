import { Node } from '@xyflow/react';
import DiagramNode from "../odyssey-protocol/DiagramNode";
import { NodeType } from '../odyssey-protocol/Enums';
import NodePosition from '../odyssey-protocol/NodePosition';
import OdysseyData from '../odyssey-protocol/OdysseyData';
import { logInDev } from '../../util/logging';

const NODE_TYPE = {
    DEFAULT: "default",
    GROUP: "group"
} as const;

type ReactFlowNodeType = typeof NODE_TYPE[keyof typeof NODE_TYPE];

export const MapToNodes = (diagramNodes: DiagramNode[]): Node<OdysseyData>[] => {
    const reactFlowNodes: Node<OdysseyData>[] = [];
    if (diagramNodes) {
        diagramNodes.forEach((diagramNode: DiagramNode, index: number) => {
            const reactFlowNode = MapToNode(diagramNode);
            if (diagramNode.parent) {
                // if this is not set than parent will stretch to cover/include all children
                reactFlowNode.extent = 'parent';
                reactFlowNode.expandParent = true;
            }
            //TODO #15: this will have to be replaced with auto-arrange algorithm
            reactFlowNode.position.x = index * 300;
            reactFlowNode.position.y = index * 100;
            reactFlowNodes.push(reactFlowNode);
        });
    }
    logInDev("[nodeMapper] mapToNodes", reactFlowNodes);
    return reactFlowNodes;
};

const MapToNodeType = (diagramNodeType: string): string => {
    return diagramNodeType === NodeType.API ? NodeType.API :
        (diagramNodeType === NodeType.APIFacet ? "field" : NODE_TYPE.DEFAULT);
};

export const MapToNode = (diagramNode: DiagramNode): Node<OdysseyData> => {
    return {
        id: diagramNode.id,
        type: MapToNodeType(diagramNode.type),
        position: { x: 0, y: 0 },
        parentId: diagramNode.parent,
        data: {
            label: diagramNode.name,
            name: diagramNode.name,
            type: diagramNode.type,
            layer: diagramNode.layer,
            parent: diagramNode.parent,
            icon: diagramNode.icon,
            style: diagramNode.style,
            url: diagramNode.url,
            method: diagramNode.method,
            direction: diagramNode.direction,
            fields: diagramNode.fields,
            extensions: diagramNode.extensions
        }
    };
};

export const MapToDiagramNodes = (nodes: Node<OdysseyData>[]): DiagramNode[] => {
    const diagramNodes: DiagramNode[] = [];
    if (nodes) {
        nodes.forEach((node: Node<OdysseyData>) => {
            const diagramNode = MapToDiagramNode(node);
            diagramNodes.push(diagramNode);
        });
    }
    return diagramNodes;
};

export const MapToDiagramNode = (node: Node<OdysseyData>): DiagramNode => {
    return {
        id: node.id,
        type: node.data.type,
        name: node.data.name,
        layer: node.data.layer,
        position: node.position as NodePosition,
        parent: node.parentId ?? node.data.parent,
        icon: node.data.icon,
        style: node.data.style,
        url: node.data.url,
        method: node.data.method,
        direction: node.data.direction,
        fields: node.data.fields,
        extensions: node.data.extensions
    };
};