import React, { useCallback, useEffect, useReducer, useRef } from "react";
import DiagramNode from "../../data/odyssey-protocol/DiagramNode";
import { ApiDirection, ApiMethod, Layer, NodeType } from "../../data/odyssey-protocol/Enums";
import DiagramNodeReducer, { DiagramNodeActionTypes } from "../../reducers/DiagramNodeReducer";
import DropdownProperty from "./DropdownProperty";
import ReadOnlyProperty from "./ReadOnlyProperty";
import TextProperty from "./TextProperty";
import './Properties.scss';

interface NodePropertiesProps {
    node: DiagramNode;
    triggerSave: boolean;
    onSave: (node: DiagramNode) => void;
}

const NodeProperties: React.FC<NodePropertiesProps> = ({ node, triggerSave, onSave }) => {
    const [diagramNode, dispatch] = useReducer(DiagramNodeReducer, null);
    const diagramNodeInitialValue = useRef(node);

    useEffect(() => {
        if (diagramNode) {
            diagramNodeInitialValue.current = diagramNode;
            onSave(diagramNode);
        }
    }, [triggerSave]);

    useEffect(() => {
        if (node) {
            dispatch({ type: DiagramNodeActionTypes.SetNode, payload: node });
            diagramNodeInitialValue.current = node;
        }
    }, [node]);

    const isModified = (field: keyof DiagramNode) => {
        return diagramNode[field] !== diagramNodeInitialValue.current[field];
    };

    const handleChange = useCallback((field: keyof DiagramNode, value: string) => {
        dispatch({ type: DiagramNodeActionTypes.SetField, field, value });
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