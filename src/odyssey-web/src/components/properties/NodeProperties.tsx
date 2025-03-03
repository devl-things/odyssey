import React, { useCallback, useEffect, useReducer, useState } from "react";
import DiagramNode from "../../data/odyssey-protocol/DiagramNode";
import DropdownProperty from "./DropdownProperty";
import ReadOnlyProperty from "./ReadOnlyProperty";
import TextProperty from "./TextProperty";
import './Properties.scss';
import { logInDev } from "../../util/logging";
import { ApiDirection, ApiMethod, Layer, NodeType } from "../../data/odyssey-protocol/Enums";


interface NodePropertiesProps {
    node: DiagramNode;
    triggerSave: boolean;
    onSave: (node: DiagramNode) => void;
}

enum NodePropertiesActionTypes {
    SetField = "set-field",
    SetNode = "set-node"
};
type NodePropertiesAction =
    | { type: NodePropertiesActionTypes.SetNode; payload: DiagramNode }
    | { type: NodePropertiesActionTypes.SetField; field: keyof DiagramNode; value: any };

const reducer = (state: DiagramNode | null, action: NodePropertiesAction): DiagramNode | null => {
    switch (action.type) {
        case NodePropertiesActionTypes.SetNode:
            return action.payload;
        case NodePropertiesActionTypes.SetField:
            return state ? { ...state, [action.field]: action.value } : null;
        default:
            return state;
    }
};

const NodeProperties: React.FC<NodePropertiesProps> = ({ node, triggerSave, onSave }) => {
    const [saved, setSaved] = useState<boolean>(false);
    const [diagramNode, dispatch] = useReducer(reducer, null);
    useEffect(() => {
        if (diagramNode) {
            setSaved(true);
            logInDev("vraceno", diagramNode);
            onSave(diagramNode);
        }
    }, [triggerSave]);
    useEffect(() => {
        if (node) {
            dispatch({ type: NodePropertiesActionTypes.SetNode, payload: node });
        }
    }, [node]);

    const handleChange = useCallback((field: keyof DiagramNode, value: string) => {
        dispatch({ type: NodePropertiesActionTypes.SetField, field, value });
    }, []);

    return (
        <div className='node-properties'>
            {diagramNode && (<>
                <ReadOnlyProperty label="Id" value={diagramNode.id} />
                <DropdownProperty options={Object.values(NodeType)} label="Type" name="type" value={diagramNode.type} onChange={handleChange} saved={saved} />
                <TextProperty label="Name" name="name" value={diagramNode.name} onChange={handleChange} saved={saved} />
                <DropdownProperty options={Object.values(Layer)} label="Layer" name="layer" value={diagramNode.layer} onChange={handleChange} saved={saved} />
                <ReadOnlyProperty label="Parent" value={diagramNode.parent} />
                {/* TODO icon */}
                <TextProperty label="Icon" name="icon" value={diagramNode.icon} onChange={handleChange} saved={saved} />
                <ReadOnlyProperty label="Position" value={JSON.stringify(diagramNode.position)} />
                {/* TODO style */}
                <ReadOnlyProperty label="Style" value={JSON.stringify(diagramNode.style)} />
                <TextProperty label="Url" name="url" value={diagramNode.url} onChange={handleChange} saved={saved} />
                {/* TODO fields ??*/}
                <ReadOnlyProperty label="Fields" value={JSON.stringify(diagramNode.fields)} />
                <DropdownProperty options={Object.values(ApiMethod)} label="Method" name="method" value={diagramNode.method} onChange={handleChange} saved={saved} />
                <DropdownProperty options={Object.values(ApiDirection)} label="Direction" name="direction" value={diagramNode.direction} onChange={handleChange} saved={saved} />
                {/* TODO extensions ??*/}
                <ReadOnlyProperty label="Extensions" value={JSON.stringify(diagramNode.extensions)} />
            </>)
            }
        </div>
    );
};

export default NodeProperties;