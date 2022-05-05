import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'react-flow-renderer';
import Sidebar from './components/Sidebar/Sidebar';
import ConfigCard from './components/ConfigCard/ConfigCard';
import loadData from './utils/loadData';
import './App.less';

let id = 0;
const getId = () => `node_${id++}`;

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [node, setNode] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  useEffect(() => {
    return () => {
      const { initialEdges, initialNodes } = loadData();
      setNodes(initialNodes);
      setEdges(initialEdges);
    };
  }, []);
  const getLabel = (label) => {
    return <div>{label}</div>;
  };
  const getSourcePosition = (type) => {
    if (type === 'input' || type === 'default') {
      return 'right';
    }
    return 'left';
  };
  const getTargetPosition = (type) => {
    if (type === 'output' || type === 'default') {
      return 'left';
    }
    return '';
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
          label: getLabel(label),
          name,
          configs: {},
          nodeType: group,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const saveNodes = () => {
    console.log(nodes);
    console.log(edges);
  };

  return (
    <div className="flow-app">
      <ReactFlowProvider>
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
        <ConfigCard node={node} save={saveNodes}></ConfigCard>
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;
