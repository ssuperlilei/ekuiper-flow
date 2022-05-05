const loadData = () => {
  const initialNodes = [
    {
      id: '1',
      type: 'input',
      sourcePosition: 'right',
      data: { label: <div>ZeroMQ</div>, name: 'zmq' },
      position: { x: 0, y: 80 },
    },
    {
      id: '2',
      data: { label: <div>滤波-IIR 滤波</div>, name: 'iir' },
      sourcePosition: 'right',
      targetPosition: 'left',
      position: { x: 250, y: 80 },
    },
    {
      id: '3',
      type: 'output',
      targetPosition: 'left',
      data: { label: <div>MQTT</div>, name: 'mqtt' },
      position: { x: 500, y: 80 },
    },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ];
  return {
    initialNodes,
    initialEdges,
  };
};

export default loadData;
