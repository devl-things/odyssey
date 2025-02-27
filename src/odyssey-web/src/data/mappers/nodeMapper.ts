import { Node } from '@xyflow/react';
import DiagramNode from "../odyssey-protocol/DiagramNode";
import NodePosition from '../odyssey-protocol/NodePosition';
import OdysseyData from './OdysseyData';
import { logInDev } from '../../util/logging';

const NODE_TYPE = {
    DEFAULT: "default",
    GROUP: "group"
} as const;

type ReactFlowNodeType = typeof NODE_TYPE[keyof typeof NODE_TYPE];

export const mapToNodes = (diagramNodes: DiagramNode[]): Node<OdysseyData>[] => {
    const reactFlowNodes: Node<OdysseyData>[] = [];
    if (diagramNodes) {
        diagramNodes.forEach((diagramNode: DiagramNode, index: number) => {
            let nodeType: ReactFlowNodeType = NODE_TYPE.DEFAULT;
            const reactFlowNode = mapToNode(diagramNode, nodeType);
            if (diagramNode.parent) {
                reactFlowNode.extent = 'parent';
                reactFlowNode.expandParent = true;
            }
            //TODO #15: this will have to be replaced with auto-arrange algorithm
            reactFlowNode.position.x = index * 200;
            reactFlowNode.position.y = index * 100;
            reactFlowNodes.push(reactFlowNode);
        });
    }
    logInDev(JSON.stringify(reactFlowNodes));
    return reactFlowNodes;
};

export const mapToNode = (diagramNode: DiagramNode, nodeType: ReactFlowNodeType): Node<OdysseyData> => {
    return {
        id: diagramNode.id,
        type: nodeType,
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

export const mapToDiagramNodes = (nodes: Node<OdysseyData>[]): DiagramNode[] => {
    const diagramNodes: DiagramNode[] = [];
    if (nodes) {
        nodes.forEach((node: Node<OdysseyData>) => {
            const diagramNode = mapToDiagramNode(node);
            diagramNodes.push(diagramNode);
        });
    }
    return diagramNodes;
};

export const mapToDiagramNode = (node: Node<OdysseyData>): DiagramNode => {
    return {
        id: node.id,
        type: node.data.type,
        name: node.data.name,
        layer: node.data.layer,
        position: node.position as NodePosition,
        parent: node.data.parent,
        icon: node.data.icon,
        style: node.data.style,
        url: node.data.url,
        method: node.data.method,
        direction: node.data.direction,
        fields: node.data.fields,
        extensions: node.data.extensions
    };
};