import React, { useEffect, useReducer, useState } from "react";
import DiagramNode from "../../data/odyssey-protocol/DiagramNode";
import TextProperty from "./TextProperty";
import './Properties.scss';

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
            onSave(diagramNode);
        }
    }, [triggerSave]);
    useEffect(() => {
        if (node) {
            dispatch({ type: NodePropertiesActionTypes.SetNode, payload: node });
        }
    }, [node]);

    const handleChange = (field: keyof DiagramNode, value: string) => {
        dispatch({ type: NodePropertiesActionTypes.SetField, field, value });
    };

    return (
        <div className='node-properties'>
            {diagramNode && (<>
                <p>ID</p>
                <input
                    type="text"
                    name="id"
                    value={diagramNode.id}
                    onChange={(e) => handleChange("id", e.target.value)}
                />
                {/* <TextProperty label="Type" name="type" value={diagramNode.type} onChange={handleChange} saved={saved} /> */}
                <TextProperty onChange={handleChange} />
                {/* <p>Type</p>
                <input
                    type="text"
                    name="type"
                    value={diagramNode.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                /> */}

                <p>Name</p>
                <input
                    type="text"
                    name="name"
                    value={diagramNode.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                />

                <p>Layer</p>
                <input
                    type="text"
                    name="layer"
                    value={diagramNode.layer}
                    onChange={(e) => handleChange("layer", e.target.value)}
                />

                <p>Icon</p>
                <input
                    type="text"
                    name="icon"
                    value={diagramNode.icon || ""}
                    onChange={(e) => handleChange("icon", e.target.value)}
                />

                <p>Parent</p>
                <input
                    type="text"
                    name="parent"
                    value={diagramNode.parent || ""}
                    onChange={(e) => handleChange("parent", e.target.value)}
                />

                <p>URL</p>
                <input
                    type="text"
                    name="url"
                    value={diagramNode.url || ""}
                    onChange={(e) => handleChange("url", e.target.value)}
                />

            </>)
            }
        </div>
    );
};

export default NodeProperties;