export enum NodeType {
    Component = "component",
    Database = "db",
    Cache = "cache",
    API = "api",
    Blob = "blob",
    Table = "table",
    APIFacet = "api-facet"
}

export enum Layer {
    Context = "context",
    Container = "container",
    Component = "component",
    Code = "code"
}

export enum ApiDirection {
    Request = "request",
    Response = "response"
}

export enum AuthenticationType {
    OAuth2 = "OAuth2",
    APIKey = "API Key",
    JWT = "JWT",
    IAMRole = "IAM Role",
    None = "None"
}

export enum EdgeType {
    Relationship = "relationship",
    DataFlow = "data-flow",
    Dependency = "dependency"
}

export enum ProcessingType {
    Batch = "batch",
    RealTime = "real-time",
    Delta = "delta"
}

export enum Protocol {
    REST = "REST",
    GraphQL = "GraphQL",
    DatabaseQuery = "Database Query",
    Kafka = "Kafka",
    S3 = "S3",
    Custom = "Custom"
}