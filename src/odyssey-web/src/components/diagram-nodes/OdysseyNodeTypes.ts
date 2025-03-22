import ApiNode from "./ApiNode";
import ApiFacetNode from "./ApiFacetNode";
import FieldNode from "./FieldNode";
import ComponentNode from "./ComponentNode";
import DatabaseNode from "./DatabaseNode";
import TableNode from "./TableNode";
import CacheNode from "./CacheNode";
import BlobNode from "./BlobNode";

const OdysseyNodeTypes = {
    api: ApiNode,
    apiFacet: ApiFacetNode,
    field: FieldNode,
    component: ComponentNode,
    db: DatabaseNode,
    table: TableNode,
    cache: CacheNode,
    blob: BlobNode
};

export default OdysseyNodeTypes;