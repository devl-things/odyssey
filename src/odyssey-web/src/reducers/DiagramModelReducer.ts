import DiagramModel from "../data/odyssey-protocol/DiagramModel";
import DiagramNode from "../data/odyssey-protocol/DiagramNode";
import DiagramEdge from "../data/odyssey-protocol/DiagramEdge";

export enum DiagramModelActionTypes {
    SET_DIAGRAM = 'SET_DIAGRAM',
    MODIFY_NODE = 'MODIFY_NODE',
    MODIFY_EDGE = 'MODIFY_EDGE',
}

// Define the actions using the enum
type DiagramAction =
    | { type: DiagramModelActionTypes.SET_DIAGRAM; payload: DiagramModel }
    | { type: DiagramModelActionTypes.MODIFY_NODE; payload: DiagramNode }
    | { type: DiagramModelActionTypes.MODIFY_EDGE; payload: DiagramEdge };

// Reducer function handling diagram state updates
const diagramModelReducer = (state: DiagramModel, action: DiagramAction): DiagramModel => {
    switch (action.type) {
        case DiagramModelActionTypes.SET_DIAGRAM:
            return action.payload;
        case DiagramModelActionTypes.MODIFY_NODE:
            return {
                ...state,
                nodes: state.nodes.map((node) =>
                    node.id === action.payload.id ? { ...node, ...action.payload } : node
                ),
            };
        case DiagramModelActionTypes.MODIFY_EDGE:
            return {
                ...state,
                edges: state.edges.map((edge) =>
                    edge.id === action.payload.id ? { ...edge, ...action.payload } : edge
                ),
            };
        default:
            return state;
    }
};

export default diagramModelReducer;