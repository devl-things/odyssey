import React, { useCallback, useEffect, useReducer, useRef } from "react";
import DiagramEdge from "../../data/odyssey-protocol/DiagramEdge";
import { EdgeType, ProcessingType, Protocol } from "../../data/odyssey-protocol/Enums";
import diagramEdgeReducer, { DiagramEdgeActionTypes } from "../../reducers/DiagramEdgeReducer";
import DropdownProperty from "./DropdownProperty";
import ReadOnlyProperty from "./ReadOnlyProperty";
import TextProperty from "./TextProperty";
import './Properties.scss';

interface EdgePropertiesProps {
    edge: DiagramEdge;
    triggerSave: boolean;
    onSave: (node: DiagramEdge) => void;
}

const EdgeProperties: React.FC<EdgePropertiesProps> = ({ edge, triggerSave, onSave }) => {
    const [diagramEdge, dispatch] = useReducer(diagramEdgeReducer, null);
    const diagramEdgeInitialValue = useRef(edge);

    useEffect(() => {
        if (diagramEdge) {
            onSave(diagramEdge);
        }
    }, [triggerSave]);

    useEffect(() => {
        if (edge) {
            dispatch({ type: DiagramEdgeActionTypes.SetEdge, payload: edge });
            diagramEdgeInitialValue.current = edge;
        }
    }, [edge]);

    const isModified = (field: keyof DiagramEdge) => {
        return diagramEdge[field] !== diagramEdgeInitialValue.current[field];
    };

    const handleChange = useCallback((field: keyof DiagramEdge, value: string) => {
        dispatch({ type: DiagramEdgeActionTypes.SetField, field, value });
    }, []);

    return (
        <div className='node-properties'>
            {diagramEdge && (<>
                <ReadOnlyProperty label="Id" value={diagramEdge.id} />
                <TextProperty label="Source" name="source" value={diagramEdge.source} isModified={isModified("source")}
                    onChange={handleChange} />
                <TextProperty label="Target" name="target" value={diagramEdge.target} isModified={isModified("target")}
                    onChange={handleChange} />
                <DropdownProperty label="Type" name="type" value={diagramEdge.type} isModified={isModified("type")}
                    options={Object.values(EdgeType)} onChange={handleChange} />
                {/* TODO boolean */}
                <TextProperty label="Override Inference" name="overrideInference" value={JSON.stringify(diagramEdge.overrideInference)} isModified={isModified("overrideInference")}
                    onChange={handleChange} />
                <DropdownProperty label="Processing Type" name="processingType" value={diagramEdge.processingType} isModified={isModified("processingType")}
                    options={Object.values(ProcessingType)} onChange={handleChange} />
                {/* TODO mapping ??*/}
                <ReadOnlyProperty label="Mapping" value={JSON.stringify(diagramEdge.mapping)} />
                <DropdownProperty label="Protocol" name="protocol" value={diagramEdge.protocol} isModified={isModified("protocol")}
                    options={Object.values(Protocol)} onChange={handleChange} />
                {/* TODO security ??*/}
                <ReadOnlyProperty label="Security" value={JSON.stringify(diagramEdge.security)} />
                {/* TODO style */}
                <ReadOnlyProperty label="Style" value={JSON.stringify(diagramEdge.style)} />
                {/* TODO extensions ??*/}
                <ReadOnlyProperty label="Extensions" value={JSON.stringify(diagramEdge.extensions)} />
            </>)
            }
        </div>
    );
};

export default EdgeProperties;