## Diagram schema
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Diagram Model Schema",
  "description": "Defines nodes and edges in a hierarchical diagram-as-code model",
  "type": "object",
  "properties": {
    "nodes": {
      "type": "array",
      "description": "List of nodes in the diagram",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "description": "Unique identifier for the node" },
          "type": {
            "type": "string",
            "enum": ["component", "db", "cache", "api", "blob", "table", "api-facet"],
            "description": "Defines the type of node"
          },
          "name": { "type": "string", "description": "Descriptive name of the node", "minLength": 1 },
          "layer": {
            "type": "string",
            "enum": ["context", "container", "component", "code"],
            "description": "Specifies which layer this node belongs to"
          },
          "icon": { "type": ["string", "null"], "description": "Path or URL to the icon representing the node", "format": "uri" },
          "parent": { "type": ["string", "null"], "description": "ID of the parent node (if applicable)" },
          "position": {
            "type": ["object", "null"],
            "description": "Optional position of the node in the diagram",
            "properties": {
              "x": { "type": "number", "description": "X-coordinate of the node" },
              "y": { "type": "number", "description": "Y-coordinate of the node" }
            },
            "required": ["x", "y"]
          },
          "style": {
            "type": ["object", "null"],
            "description": "Optional styling attributes for visualization",
            "properties": {
              "backgroundColor": { "type": "string", "description": "Background color for nodes (hex format)" },
              "color": { "type": "string", "description": "Edge color (hex or named)" },
              "lineType": { "type": "string", "enum": ["solid", "dashed", "dotted"], "description": "Defines edge line type" }
            },
            "additionalProperties": false
          },
          "url": { "type": ["string", "null"], "description": "Applicable for db, api, blob nodes", "format": "uri" },
          "fields": {
            "type": ["array", "null"],
            "description": "Applicable for table and api-facet nodes",
            "items": {
              "type": "object",
              "properties": {
                "name": { "type": "string", "description": "Field name" },
                "type": { "type": "string", "description": "Data type (string, integer, etc.)" },
                "primaryKey": { "type": "boolean", "description": "Indicates if field is a primary key", "default": false }
              },
              "required": ["name", "type"]
            }
          },
          "method": { "type": ["string", "null"], "description": "Applicable for api-facet nodes", "enum": ["GET", "POST", "PUT", "DELETE"] },
          "direction": { "type": "string", "enum": ["request", "response"], "description": "Defines if the API facet represents a request or a response" },
          "extensions": {
            "type": ["object", "null"],
            "description": "Custom attributes for model extension",
            "additionalProperties": {
              "type": ["string", "number", "boolean", "array", "object", "null"],
              "description": "Flexible key-value pairs for additional metadata"
            }
          }
        },
        "required": ["id", "type", "layer"]
      }
    },
    "edges": {
      "type": "array",
      "description": "List of edges representing relationships between nodes",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "description": "Unique identifier for the edge" },
          "source": { "type": "string", "description": "ID of the source node" },
          "target": { "type": "string", "description": "ID of the target node" },
          "type": {
            "type": "string",
            "enum": ["relationship", "data-flow", "dependency"],
            "description": "Defines the type of relationship"
          },
          "processingType": {
            "type": "string",
            "enum": ["batch", "real-time", "delta"],
            "description": "Defines whether the connection is batch, real-time, or delta processing"
          },
          "overrideInference": {
            "type": "boolean",
            "default": false,
            "description": "Prevents automatic inference of this edge at higher levels"
          },
          "label": { "type": ["string", "null"], "description": "Human-readable label describing the connection" },
          "mapping": {
            "type": ["array", "null"],
            "description": "Field-to-field mappings for structured data flow",
            "items": {
              "type": "object",
              "properties": {
                "sourceField": { "type": "string", "description": "Field name in the source node" },
                "targetField": { "type": "string", "description": "Field name in the target node" },
                "transformation": { "type": ["string", "null"], "description": "Optional transformation function (e.g., to_string, round(2))" }
              },
              "required": ["sourceField", "targetField"]
            }
          },
          "protocol": {
            "type": ["string", "null"],
            "enum": ["REST", "GraphQL", "Database Query", "Kafka", "S3", "Custom"],
            "description": "Defines the communication protocol"
          },
          "security": {
            "type": ["object", "null"],
            "description": "Defines security properties for the edge",
            "properties": {
              "encryption": { "type": "boolean", "description": "Indicates whether encryption is enabled" },
              "authentication": {
                "type": ["string", "null"],
                "enum": ["OAuth2", "API Key", "JWT", "IAM Role", "None"],
                "description": "Defines the authentication method"
              }
            },
            "additionalProperties": false
          },
          "style": {
            "type": ["object", "null"],
            "description": "Optional styling attributes for visualization",
            "properties": {
              "backgroundColor": { "type": "string", "description": "Background color for nodes (hex format)" },
              "color": { "type": "string", "description": "Edge color (hex or named)" },
              "lineType": { "type": "string", "enum": ["solid", "dashed", "dotted"], "description": "Defines edge line type" }
            },
            "additionalProperties": false
          },
          "extensions": {
            "type": ["object", "null"],
            "description": "Custom attributes for model extension",
            "additionalProperties": {
              "type": ["string", "number", "boolean", "array", "object", "null"],
              "description": "Flexible key-value pairs for additional metadata"
            }
          }
        },
        "required": ["id", "source", "target", "type", "processingType"]
      }
    }
  },
  "required": ["nodes", "edges"],
  "additionalProperties": false
}


```

### Diagram example
```json
{
  "nodes": [
    {
      "id": "system_1",
      "type": "component",
      "name": "User Management System",
      "layer": "context"
    },
    {
      "id": "db_1",
      "type": "db",
      "name": "User Database",
      "layer": "container",
      "parent": "system_1"
    }
  ],
  "edges": [
    {
      "id": "edge_1",
      "source": "db_1",
      "target": "api_1",
      "type": "data-flow",
      "overrideInference": true
    }
  ]
}

```

### Node Examples
```json
{
  "id": "component_1",
  "type": "component",
  "name": "Main Component",
  "icon": "component-icon.svg",
  "parent": null,
  "position": { "x": 100, "y": 100 },
  "style": { "backgroundColor": "#FFD700" },
  "extensions": {
    "environment": "production",
    "owner": "Admin"
  }
}
{
  "id": "db_1",
  "type": "db",
  "name": "User Database",
  "url": "postgres://user:pass@localhost:5432/dbname",
  "icon": "db-icon.svg",
  "parent": "component_1",
  "position": { "x": 200, "y": 150 },
  "style": { "backgroundColor": "#3498DB" },
  "extensions": {
    "replication": "enabled",
    "backupFrequency": "daily"
  }
}
{
  "id": "cache_1",
  "type": "cache",
  "icon": "cache-icon.svg",
  "parent": "component_1",
  "position": null,
  "style": { "backgroundColor": "#FF5733" },
  "extensions": {
    "ttl": "3600s",
    "cacheType": "redis"
  }
}
{
  "id": "api_1",
  "type": "api",
  "url": "https://api.example.com",
  "icon": "api-icon.svg",
  "parent": "component_1",
  "position": { "x": 300, "y": 100 },
  "style": null,
  "extensions": {
    "authentication": "OAuth2",
    "rateLimit": 1000
  }
}
{
  "id": "blob_1",
  "type": "blob",
  "url": "s3://my-bucket",
  "icon": "blob-icon.svg",
  "parent": "component_1",
  "position": { "x": 400, "y": 200 },
  "style": { "backgroundColor": "#8E44AD" },
  "extensions": {
    "storageClass": "STANDARD",
    "retentionPolicy": "365 days"
  }
}
{
  "id": "table_1",
  "type": "table",
  "name": "Users",
  "fields": [
    { "name": "id", "type": "integer", "primaryKey": true },
    { "name": "name", "type": "string" },
    { "name": "email", "type": "string" }
  ],
  "parent": "db_1",
  "position": { "x": 500, "y": 250 },
  "style": { "backgroundColor": "#2ECC71" },
  "extensions": {
    "encryption": true,
    "sharding": "enabled"
  }
}
{
  "id": "api_facet_1",
  "type": "api-facet",
  "method": "POST",
  "direction": "request",
  "fields": [
    { "name": "user_id", "type": "integer" },
    { "name": "data", "type": "json" }
  ],
  "parent": "api_1",
  "position": { "x": 600, "y": 300 },
  "style": { "backgroundColor": "#E74C3C" },
  "extensions": {
    "authentication": "JWT",
    "responseFormat": "JSON"
  }
}

```


### Edge Examples
```json
{
  "id": "edge_1",
  "source": "table_orders",
  "target": "api_facet_request",
  "type": "data-flow",
  "label": "Order Data Mapping",
  "mapping": [
    {
      "sourceField": "user_id",
      "targetField": "customer_id",
      "transformation": "to_integer"
    },
    {
      "sourceField": "amount",
      "targetField": "order_amount",
      "transformation": "round(2)"
    }
  ],
  "protocol": "REST",
  "security": {
    "encryption": false,
    "authentication": "JWT"
  }
}

{
  "id": "edge_2",
  "source": "api_facet_response",
  "target": "table_orders",
  "type": "data-flow",
  "label": "Stores API Response",
  "mapping": [
    {
      "sourceField": "order_id",
      "targetField": "order_id",
      "transformation": "to_integer"
    }
  ],
  "protocol": "REST",
  "security": {
    "encryption": false,
    "authentication": "JWT"
  }
}

{
  "id": "edge_3",
  "source": "component_1",
  "target": "component_2",
  "type": "dependency",
  "label": "Sends Events To",
  "protocol": "Kafka",
  "security": {
    "encryption": true,
    "authentication": "OAuth2"
  },
  "extensions": {
    "eventType": "UserCreated"
  }
}

```