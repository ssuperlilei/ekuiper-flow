const getNodeType = (type) => {
  if (type === 'operator') {
    return 'function';
  }
  return type;
};

const deserializeNodes = (nodes, edges) => {
  const _nodes = [];
  Object.keys(nodes).forEach((key) => {
    const node = nodes[key];
    const { meta, visualization, ...otherInfo } = node.props;
    const _node = {
      data: {
        label: key,
        name: key,
        nodeType: getNodeType(node.type),
        configs: otherInfo,
      },
      ...node.props.meta,
    };
    _nodes.push(_node);
    // Handle Add chart node
    if (visualization) {
      _nodes.push(visualization);
      edges[key] = [visualization.data.name];
    }
  });
  return _nodes;
};

const findNode = (name, nodes) => {
  const node = nodes.find((node) => node.data.name === name);
  return node;
};

const deserializeEdges = (edges, nodes) => {
  const _edges = [];
  Object.keys(edges).forEach((key) => {
    const edge = edges[key];
    const node = findNode(key, nodes);
    edge.forEach((target) => {
      const targetNode = findNode(target, nodes);
      const _edge = {
        id: `reactflow__edge-${node.id}-${targetNode.id}`,
        source: node.id,
        animated: true,
        target: targetNode.id,
        sourceHandle: null,
        targetHandle: null,
      };
      _edges.push(_edge);
    });
  });
  return _edges;
};

// 反序列化 Nodes，Edges 到 React Flow 可用的 Nodes 和 Edges 数据
const handleNodes = (data) => {
  if (!data) {
    return {
      initialNodes: [],
      initialEdges: [],
    };
  }
  const {
    nodes,
    topo: { edges },
  } = data.graph;
  const initialNodes = deserializeNodes(nodes, edges);
  const initialEdges = deserializeEdges(edges, initialNodes);
  return {
    initialNodes,
    initialEdges,
  };
};

export default handleNodes;
