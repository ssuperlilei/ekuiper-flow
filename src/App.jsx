/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'react-flow-renderer';
import Sidebar from './Components/Sidebar/Sidebar';
import ConfigCard from './Components/ConfigCard/ConfigCard';
import loadData from './Utils/loadData';
import './App.css';

let id = 0;
const getId = () => `dndnode_${id++}`;

const { initialEdges, initialNodes } = loadData();

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [node, setNode] = useState(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const getLabel = (label) => {
    return (
      <div>{label}</div>
    )
  }
  const onNodeClick = useCallback((event, node) => {
    console.log(node)
    setNode(node)
  });
  const onConnect = useCallback((params) => {
    const _params = {
      animated: true,
      ...params,
    }
    return setEdges((eds) => addEdge(_params, eds))
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
      const label = event.dataTransfer.getData('getLabel');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const getSourcePosition = () => {
        if (type === 'input' || type === 'default') {
          return 'right'
        }
        return 'left'
      }
      const getTargetPosition = () => {
        if (type === 'output' || type === 'default') {
          return 'left'
        }
        return ''
      }
      const newNode = {
        id: getId(),
        type,
        position,
        sourcePosition: getSourcePosition(),
        targetPosition: getTargetPosition(),
        data: {
          label: getLabel(label),
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

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
        <ConfigCard node={node}></ConfigCard>
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;
