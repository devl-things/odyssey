import DiagramNode from "./DiagramNode";
import Edge from "./Edge";

export default interface DiagramModel {
    nodes: DiagramNode[];
    edges: Edge[];
}