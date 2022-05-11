// 反序列化 Nodes，Edges 到 React Flow 可用的 Nodes 和 Edges 数据
const handleNodes = (data) => {
  console.log(data);
  if (!data) {
    return {
      initialNodes: [],
      initialEdges: [],
    };
  }
  const initialNodes = [];
  const initialEdges = [];
  return {
    initialNodes,
    initialEdges,
  };
};

export default handleNodes;
