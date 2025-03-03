import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
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
    const [diagramNode, dispatch] = useReducer(reducer, null);
    const diagramNodeInitialValue = useRef(node);

    useEffect(() => {
        if (diagramNode) {
            logInDev("vraceno", diagramNode);
            onSave(diagramNode);
        }
    }, [triggerSave]);

    useEffect(() => {
        if (node) {
            dispatch({ type: NodePropertiesActionTypes.SetNode, payload: node });
            diagramNodeInitialValue.current = node;
        }
    }, [node]);

    const isModified = (field: keyof DiagramNode) => {
        return diagramNode[field] !== diagramNodeInitialValue.current[field];
    };

    const handleChange = useCallback((field: keyof DiagramNode, value: string) => {
        dispatch({ type: NodePropertiesActionTypes.SetField, field, value });
    }, []);

    return (
        <div className='node-properties'>
            {diagramNode && (<>
                <ReadOnlyProperty label="Id" value={diagramNode.id} />
                <DropdownProperty label="Type" name="type" value={diagramNode.type} isModified={isModified("type")}
                    options={Object.values(NodeType)} onChange={handleChange} />
                <TextProperty label="Name" name="name" value={diagramNode.name} isModified={isModified("name")}
                    onChange={handleChange} />
                <DropdownProperty label="Layer" name="layer" value={diagramNode.layer} isModified={isModified("layer")}
                    options={Object.values(Layer)} onChange={handleChange} />
                <ReadOnlyProperty label="Parent" value={diagramNode.parent} />
                {/* TODO icon */}
                <TextProperty label="Icon" name="icon" value={diagramNode.icon} isModified={isModified("icon")}
                    onChange={handleChange} />
                <ReadOnlyProperty label="Position" value={JSON.stringify(diagramNode.position)} />
                {/* TODO style */}
                <ReadOnlyProperty label="Style" value={JSON.stringify(diagramNode.style)} />
                <TextProperty label="Url" name="url" value={diagramNode.url} isModified={isModified("url")}
                    onChange={handleChange} />
                {/* TODO fields ??*/}
                <ReadOnlyProperty label="Fields" value={JSON.stringify(diagramNode.fields)} />
                <DropdownProperty label="Method" name="method" value={diagramNode.method} isModified={isModified("method")}
                    options={Object.values(ApiMethod)} onChange={handleChange} />
                <DropdownProperty label="Direction" name="direction" value={diagramNode.direction} isModified={isModified("direction")}
                    options={Object.values(ApiDirection)} onChange={handleChange} />
                {/* TODO extensions ??*/}
                <ReadOnlyProperty label="Extensions" value={JSON.stringify(diagramNode.extensions)} />
            </>)
            }
        </div>
    );
};

export default NodeProperties;