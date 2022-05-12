const getNodeType = (type) => {
  if (type === 'operator') {
    return 'function';
  }
  return type;
};

const deserializeNodes = (nodes) => {
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
    if (visualization) {
      _nodes.push(visualization);
    }
  });
  return _nodes;
};

// 反序列化 Nodes，Edges 到 React Flow 可用的 Nodes 和 Edges 数据
const handleNodes = (data) => {
  if (!data) {
    return {
      initialNodes: [],
      initialEdges: [],
    };
  }
  const { nodes, edges } = data.graph;
  const initialNodes = deserializeNodes(nodes);
  const initialEdges = [];
  return {
    initialNodes,
    initialEdges,
  };
};

export default handleNodes;
