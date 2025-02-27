import DiagramNode from "./DiagramNode";
import DiagramEdge from "./DiagramEdge";

export default interface DiagramModel {
    nodes: DiagramNode[];
    edges: DiagramEdge[];
}