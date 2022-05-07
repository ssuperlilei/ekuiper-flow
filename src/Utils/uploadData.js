const uploadNodes = (nodes, edges) => {
  // nodes
  const _nodes = {};
  const tranType = ({ name, nodeType }) => {
    let _type = nodeType;
    let _nodeType = nodeType;
    if (nodeType === 'function') {
      _type = 'operator';
    } else {
      _nodeType = name;
    }
    return {
      _type,
      _nodeType,
    };
  };
  nodes.forEach((node) => {
    const { data, ...otherInfo } = node;
    const { name, configs } = data;
    const { _type, _nodeType } = tranType(data);
    _nodes[name] = {
      type: _type,
      nodeType: _nodeType,
      prop: {
        ...configs,
        meta: otherInfo,
      },
    };
  });
  // edges
  const _topo = {};
  const data = {
    id: 'rule1',
    name: '规则ui',
    graph: {
      nodes: _nodes,
      topo: _topo,
    },
  };
};

export default uploadNodes;
