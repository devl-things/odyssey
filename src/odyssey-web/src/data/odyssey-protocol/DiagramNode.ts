import { ApiDirection, ApiMethod, Layer, NodeType } from './Enums';
import NodeField from './NodeField';
import NodePosition from './NodePosition';
import DiagramStyle from './DiagramStyle';

export default interface DiagramNode {
    id: string;
    type: NodeType;
    name: string;
    layer: Layer;
    icon?: string | null;
    parent?: string | null;
    position?: NodePosition | null;
    style?: DiagramStyle | null;
    url?: string | null; // Applicable for db, api, blob nodes
    fields?: NodeField[] | null; // Applicable for table & api-facet
    method?: ApiMethod | null; // Only for API facets
    direction?: ApiDirection | null; // Only for API facets
    extensions?: Record<string, string | number | boolean | object | null> | null;
}