## Context layer
| Property | Set |
|-|-|
| position | &#10060; |
| style | &#10060; |

```json
{
  "nodes": [
    {
      "id": "dog",
      "type": "component",
      "name": "Dog",
      "layer": "context",
      "icon": "https://robohash.org/dog"
    },
    {
      "id": "vixen",
      "type": "component",
      "name": "Vixen",
      "layer": "context",
      "icon": "https://robohash.org/vixen"
    },
    {
      "id": "bee",
      "type": "component",
      "name": "Bee",
      "layer": "context",
      "icon": "https://robohash.org/bee"
    },
    {
      "id": "wasp",
      "type": "component",
      "name": "Wasp",
      "layer": "context",
      "icon": "https://robohash.org/wasp"
    }
  ],
  "edges": [
    {
      "id": "1",
      "source": "bee",
      "target": "dog",
      "type": "relationship",
      "overrideInference": false
    },
    {
      "id": "2",
      "source": "bee",
      "target": "vixen",
      "type": "relationship",
      "overrideInference": false
    },
    {
      "id": "3",
      "source": "vixen",
      "target": "dog",
      "type": "relationship",
      "overrideInference": false
    },
    {
      "id": "4",
      "source": "bee",
      "target": "wasp",
      "type": "relationship",
      "overrideInference": false
    },
    {
      "id": "5",
      "source": "wasp",
      "target": "vixen",
      "type": "relationship",
      "overrideInference": false
    }
  ]
}

```

## Mix layer (Context and Component)

| Property | Set |
|-|-|
| position | &#10060; |
| style | &#10060; |

```json
{
  "nodes": [
    {
      "id": "dog",
      "type": "component",
      "name": "Dog",
      "layer": "context",
      "icon": "https://robohash.org/dog"
    },
    {
      "id": "vixen",
      "type": "component",
      "name": "Vixen",
      "layer": "context",
      "icon": "https://robohash.org/vixen"
    },
    {
      "id": "bee",
      "type": "component",
      "name": "Bee",
      "layer": "context",
      "icon": "https://robohash.org/bee"
    },
    {
      "id": "bee_ham",
      "type": "container",
      "name": "Ham",
      "layer": "container",
      "parent": "bee",
      "icon": "https://robohash.org/ham"
    },
    {
      "id": "wasp",
      "type": "component",
      "name": "Wasp",
      "layer": "context",
      "icon": "https://robohash.org/wasp"
    },
    {
      "id": "wasp_base",
      "type": "db",
      "name": "Base",
      "layer": "container",
      "parent": "wasp",
      "icon": "https://robohash.org/base"
    }
  ],
  "edges": [
    {
      "id": "1",
      "source": "bee",
      "target": "dog",
      "type": "relationship",
      "overrideInference": false
    },
    {
      "id": "2",
      "source": "bee",
      "target": "vixen",
      "type": "relationship",
      "overrideInference": false
    },
    {
      "id": "3",
      "source": "vixen",
      "target": "dog",
      "type": "relationship",
      "overrideInference": false
    },
    {
      "id": "4",
      "source": "bee_ham",
      "target": "wasp_base",
      "type": "data-flow",
      "overrideInference": true
    },
    {
      "id": "5",
      "source": "wasp",
      "target": "vixen",
      "type": "relationship",
      "overrideInference": false
    }
  ]
}

```

after it was manually rearranged 

```json
{
  "nodes": [
    {
      "id": "dog",
      "type": "component",
      "name": "Dog",
      "layer": "context",
      "position": {
        "x": 458,
        "y": 396.5546875
      },
      "icon": "https://robohash.org/dog"
    },
    {
      "id": "vixen",
      "type": "component",
      "name": "Vixen",
      "layer": "context",
      "position": {
        "x": 276,
        "y": 294
      },
      "icon": "https://robohash.org/vixen"
    },
    {
      "id": "bee",
      "type": "component",
      "name": "Bee",
      "layer": "context",
      "position": {
        "x": 399,
        "y": -7.375
      },
      "icon": "https://robohash.org/bee"
    },
    {
      "id": "bee_ham",
      "type": "container",
      "name": "Ham",
      "layer": "container",
      "position": {
        "x": 2,
        "y": 34
      },
      "parent": "bee",
      "icon": "https://robohash.org/ham"
    },
    {
      "id": "wasp",
      "type": "component",
      "name": "Wasp",
      "layer": "context",
      "position": {
        "x": 110,
        "y": 127
      },
      "icon": "https://robohash.org/wasp"
    },
    {
      "id": "wasp_base",
      "type": "db",
      "name": "Base",
      "layer": "container",
      "position": {
        "x": 0,
        "y": 38
      },
      "parent": "wasp",
      "icon": "https://robohash.org/base"
    }
  ],
  "edges": [
    {
      "id": "1",
      "source": "bee",
      "target": "dog",
      "type": "relationship"
    },
    {
      "id": "2",
      "source": "bee",
      "target": "vixen",
      "type": "relationship"
    },
    {
      "id": "3",
      "source": "vixen",
      "target": "dog",
      "type": "relationship"
    },
    {
      "id": "4",
      "source": "bee_ham",
      "target": "wasp_base",
      "type": "relationship"
    },
    {
      "id": "5",
      "source": "wasp",
      "target": "vixen",
      "type": "relationship"
    }
  ]
}

```