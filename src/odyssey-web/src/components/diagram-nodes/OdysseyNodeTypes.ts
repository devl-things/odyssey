import ApiNode from "./ApiNode";
import ApiFacetNode from "./ApiFacetNode";
import FieldNode from "./FieldNode";
import ComponentNode from "./ComponentNode";
import DatabaseNode from "./DatabaseNode";
import TableNode from "./TableNode";

const OdysseyNodeTypes = {
    api: ApiNode,
    apiFacet: ApiFacetNode,
    field: FieldNode,
    component: ComponentNode,
    db: DatabaseNode,
    table: TableNode
};

export default OdysseyNodeTypes;