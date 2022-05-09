import { message } from 'antd';
import axios from 'axios';

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

const findNodeName = (id, nodes) => {
  const node = nodes.find((node) => node.id === id);
  return node.data.name;
};

// 序列化 Nodes
const serialisedNodes = (nodes) => {
  const _nodes = {};
  nodes.forEach((node) => {
    const { data, ...otherInfo } = node;
    const { name, configs } = data;
    const { _type, _nodeType } = tranType(data);
    _nodes[name] = {
      type: _type,
      nodeType: _nodeType,
      props: {
        ...configs,
        meta: otherInfo,
      },
    };
  });
  return _nodes;
};
// 序列化 Edges
const serialisedEdges = (edges, nodes) => {
  const allSources = edges.map((edge) => edge.source);
  const allTargets = edges.map((edge) => edge.target);
  const sourceNodeIds = _.uniq(
    allSources.filter((source) => {
      return !allTargets.includes(source);
    }),
  );
  const _sources = sourceNodeIds.map((nodeId) => findNodeName(nodeId, nodes));
  const _edges = {};
  edges.forEach((edge) => {
    const { source, target } = edge;
    const sourceName = findNodeName(source, nodes);
    const targetName = findNodeName(target, nodes);
    if (_edges[sourceName] !== undefined && Array.isArray(_edges[sourceName])) {
      _edges[sourceName].push(targetName);
    } else {
      _edges[sourceName] = [targetName];
    }
  });
  return {
    _sources,
    _edges,
  };
};

const uploadNodes = async (nodes, edges) => {
  // nodes
  const _nodes = serialisedNodes(nodes);
  // edges
  const { _sources, _edges } = serialisedEdges(edges, nodes);
  const _topo = {
    sources: _sources,
    edges: _edges,
  };
  const data = {
    id: 'rule1',
    name: '规则ui',
    graph: {
      nodes: _nodes,
      topo: _topo,
    },
  };
  console.log(JSON.stringify(data));
  try {
    const res = await axios.post('http://127.0.0.1:9081/rules', data);
    console.log(res);
    if (res.status === 201) {
      message.success(res.data);
    }
  } catch (error) {
    console.log(error);
    message.error(error.response.data);
  }
};

export default uploadNodes;
