import DiagramModel from "./DiagramModel";
import DiagramNode from "./DiagramNode";
import DiagramEdge from "./DiagramEdge";

//TODO: #25
// Type Guard for DiagramNode
export const isDiagramNode = (obj: any): obj is DiagramNode => {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.id === "string" &&
        typeof obj.type === "string" &&
        typeof obj.name === "string" &&
        typeof obj.layer === "string" &&
        (obj.icon === undefined || obj.icon === null || typeof obj.icon === "string") &&
        (obj.parent === undefined || obj.parent === null || typeof obj.parent === "string") &&
        (obj.position === undefined || obj.position === null || typeof obj.position === "object") &&
        (obj.style === undefined || obj.style === null || typeof obj.style === "object") &&
        (obj.url === undefined || obj.url === null || typeof obj.url === "string") &&
        (obj.fields === undefined || obj.fields === null || Array.isArray(obj.fields)) &&
        (obj.method === undefined || obj.method === null || ["GET", "POST", "PUT", "DELETE"].includes(obj.method)) &&
        (obj.direction === undefined || obj.direction === null || typeof obj.direction === "string") &&
        (obj.extensions === undefined || obj.extensions === null || typeof obj.extensions === "object")
    );
};

// Type Guard for DiagramEdge
export const isDiagramEdge = (obj: any): obj is DiagramEdge => {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.id === "string" &&
        typeof obj.source === "string" &&
        typeof obj.target === "string" &&
        typeof obj.type === "string" &&
        (obj.overrideInference === undefined || typeof obj.overrideInference === "boolean") &&
        (obj.processingType === undefined || obj.processingType === null || typeof obj.processingType === "string") &&
        (obj.abel === undefined || obj.abel === null || typeof obj.abel === "string") &&
        (obj.mapping === undefined || obj.mapping === null || Array.isArray(obj.mapping)) &&
        (obj.protocol === undefined || obj.protocol === null || typeof obj.protocol === "string") &&
        (obj.security === undefined || obj.security === null || typeof obj.security === "object") &&
        (obj.style === undefined || obj.style === null || typeof obj.style === "object") &&
        (obj.extensions === undefined || obj.extensions === null || typeof obj.extensions === "object")
    );
};

// Type Guard for DiagramModel
export const isDiagramModel = (obj: any): obj is DiagramModel => {
    return (
        typeof obj === "object" &&
        obj !== null &&
        Array.isArray(obj.nodes) &&
        obj.nodes.every(isDiagramNode) &&
        Array.isArray(obj.edges) &&
        obj.edges.every(isDiagramEdge)
    );
};
