import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  useReactFlow,
} from 'react-flow-renderer';
import Sidebar from './components/Sidebar/Sidebar';
import ConfigCard from './components/ConfigCard/ConfigCard';
import handleNodes from './utils/handleNodes';
import uploadData from './utils/uploadData';
import './App.less';
import { message } from 'antd';
import useFetchNodes from './hooks/useFetchNodes';

const flowKey = 'ekuiper-flow';
const getId = () => `ekuiper_flow_${Math.random().toString(16).substr(2, 8)}`;

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [node, setNode] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const ruleId = window.location.pathname.split('/')[2];
  const { apiData } = useFetchNodes(ruleId);
  const { initialEdges, initialNodes } = handleNodes(apiData && apiData.data);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [apiData]);
  const getSourcePosition = (type) => {
    if (type === 'output') {
      return undefined;
    }
    return 'right';
  };
  const getTargetPosition = (type) => {
    if (type === 'input') {
      return undefined;
    }
    return 'left';
  };
  const onNodeClick = useCallback((event, node) => {
    setNode(node);
  });
  const onConnect = useCallback((params) => {
    const _params = {
      animated: true,
      ...params,
    };
    return setEdges((eds) => addEdge(_params, eds));
  }, []);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('getNodeType');
      const name = event.dataTransfer.getData('getNodeName');
      const label = event.dataTransfer.getData('getNodeLabel');
      const group = event.dataTransfer.getData('getNodeGroup');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        sourcePosition: getSourcePosition(type),
        targetPosition: getTargetPosition(type),
        data: {
          label,
          name,
          configs: {},
          nodeType: group,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      message.success('本地保存成功');
    }
  }, [reactFlowInstance]);
  const restoreFlow = async () => {
    const flow = JSON.parse(localStorage.getItem(flowKey));
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
      message.success('恢复数据成功');
    }
  };
  const onRestore = useCallback(() => {
    restoreFlow();
  }, [setNodes, setViewport]);

  const uploadNodes = () => {
    const flow = reactFlowInstance.toObject();
    // TO DO, save viewport on API
    console.log(flow.viewport);
    uploadData(nodes, edges);
  };

  return (
    <div className="flow-app">
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap
            maskColor="#555B69"
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              if (n.type === 'input') return '#0041d0';
              if (n.type === 'output') return '#ff0072';
              if (n.type === 'default') return '#1a192b';
              return '#eee';
            }}
            nodeColor={(n) => {
              if (n.style?.background) return n.style.background;
              return '#fff';
            }}
            nodeBorderRadius={2}
          ></MiniMap>
          <Controls />
          <Background color="#555B69" gap={16} />
        </ReactFlow>
      </div>
      <ConfigCard node={node} save={onSave} restore={onRestore} upload={uploadNodes}></ConfigCard>
    </div>
  );
};

const FlowWithProvider = () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);

export default FlowWithProvider;
