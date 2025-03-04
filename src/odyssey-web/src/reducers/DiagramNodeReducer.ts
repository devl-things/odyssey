import DiagramNode from "../data/odyssey-protocol/DiagramNode";

export enum DiagramNodeActionTypes {
    SetField = "set-field",
    SetNode = "set-node"
};

type DiagramNodeAction =
    | { type: DiagramNodeActionTypes.SetNode; payload: DiagramNode }
    | { type: DiagramNodeActionTypes.SetField; field: keyof DiagramNode; value: any };

const DiagramNodeReducer = (state: DiagramNode | null, action: DiagramNodeAction): DiagramNode | null => {
    switch (action.type) {
        case DiagramNodeActionTypes.SetNode:
            return action.payload;
        case DiagramNodeActionTypes.SetField:
            return state ? { ...state, [action.field]: action.value } : null;
        default:
            return state;
    }
};

export default DiagramNodeReducer;