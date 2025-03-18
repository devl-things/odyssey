import DiagramEdge from "../data/odyssey-protocol/DiagramEdge";

export enum DiagramEdgeActionTypes {
    SetField = "set-field",
    SetEdge = "set-edge"
};
type DiagramEdgeAction =
    | { type: DiagramEdgeActionTypes.SetEdge; payload: DiagramEdge }
    | { type: DiagramEdgeActionTypes.SetField; field: keyof DiagramEdge; value: any };

const diagramEdgeReducer = (state: DiagramEdge | null, action: DiagramEdgeAction): DiagramEdge | null => {
    switch (action.type) {
        case DiagramEdgeActionTypes.SetEdge:
            return action.payload;
        case DiagramEdgeActionTypes.SetField:
            return state ? { ...state, [action.field]: action.value } : null;
        default:
            return state;
    }
};

export default diagramEdgeReducer;