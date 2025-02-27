import { EdgeType, ProcessingType, Protocol } from "./Enums";
import FieldMapping from "./FieldMapping";
import EdgeSecurity from "./EdgeSecurity";
import DiagramStyle from "./DiagramStyle";

export default interface DiagramEdge {
    id: string;
    source: string;
    target: string;
    type: EdgeType;
    overrideInference?: boolean; // Prevents automatic inference at higher levels
    processingType?: ProcessingType; // batch, real-time, delta
    abel?: string | null;
    mapping?: FieldMapping[] | null; // Used for field-to-field mapping
    protocol?: Protocol | null;
    security?: EdgeSecurity | null;
    style?: DiagramStyle | null; // Styling for visualization
    extensions?: Record<string, string | number | boolean | object | null> | null;
}