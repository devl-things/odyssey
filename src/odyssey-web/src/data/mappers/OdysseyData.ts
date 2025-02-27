import { ApiDirection, Layer, NodeType } from '../odyssey-protocol/Enums';
import NodeField from '../odyssey-protocol/NodeField';
import DiagramStyle from '../odyssey-protocol/DiagramStyle';

type OdysseyData = {
    label: string;
    name: string;
    type: NodeType;
    layer: Layer;
    icon?: string | null;
    parent?: string | null;
    //TODO: #16
    style?: DiagramStyle | null;
    url?: string | null; // Applicable for db, api, blob nodes
    fields?: NodeField[] | null; // Applicable for table & api-facet
    method?: "GET" | "POST" | "PUT" | "DELETE" | null; // Only for API facets
    direction?: ApiDirection | null; // Only for API facets
    extensions?: Record<string, string | number | boolean | object | null> | null;
}

export default OdysseyData;