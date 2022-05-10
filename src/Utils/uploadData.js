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

const findNode = (id, nodes) => {
  const node = nodes.find((node) => node.id === id);
  return node;
};

const findChartSources = (id, nodes, edges) => {
  const chartsSources = [];
  edges.forEach((edge) => {
    if (edge.target === id) {
      const edgeSourceNode = findNode(edge.source, nodes);
      chartsSources.push(edgeSourceNode.data.name);
    }
  });
  return chartsSources;
};

// 序列化 Nodes
const serialisedNodes = (nodes, edges) => {
  const _nodes = {};
  const chartNodes = [];
  nodes.forEach((node) => {
    const { data, ...otherInfo } = node;
    const { name, configs } = data;
    const { _type, _nodeType } = tranType(data);
    // Don't add chart node
    if (_type === 'chart') {
      chartNodes.push(node);
      return;
    }
    _nodes[name] = {
      type: _type,
      nodeType: _nodeType,
      props: {
        ...configs,
        meta: otherInfo,
      },
    };
  });
  // Set the visualization to sink node
  chartNodes.forEach((chartNode) => {
    const chartsSources = findChartSources(chartNode.id, nodes, edges);
    chartsSources.forEach((chartSource) => {
      if (_nodes[chartSource]) {
        _nodes[chartSource].props.visualization = chartNode;
      }
    });
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
  const _sources = sourceNodeIds.map((nodeId) => {
    const currNode = findNode(nodeId, nodes);
    return currNode.data.name;
  });
  const _edges = {};
  edges.forEach((edge) => {
    const { source, target } = edge;
    const sourceNode = findNode(source, nodes);
    const targetNode = findNode(target, nodes);
    const sourceName = sourceNode.data.name;
    const targetName = targetNode.data.name;
    // Don't add chart node
    if (targetNode.data.nodeType === 'chart') {
      return;
    }
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
  const _nodes = serialisedNodes(nodes, edges);
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
  console.log(data);
  try {
    const res = await axios.post('http://127.0.0.1:9081/rules', data);
    if (res.status === 201) {
      message.success(res.data);
    }
  } catch (error) {
    message.error(error.response.data);
  }
};

export default uploadNodes;
