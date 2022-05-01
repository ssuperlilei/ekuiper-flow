const loadDndNodes = () => {
  const dndNodes = [
    {
      label: 'ZeroMQ',
      value: 'ZeroMQ',
      type: 'input',
      group: 'source',
    },
    {
      label: 'MQTT',
      value: 'mqtt',
      type: 'input',
      group: 'source',
    },
    {
      label: 'MQTT',
      value: 'mqtt',
      type: 'output',
      group: 'sink',
    },
    {
      label: 'RMS 统计',
      value: 'rms',
      type: 'default',
      group: 'function',
    },
    {
      label: '滤波-IIR 滤波',
      value: 'iir',
      type: 'def',
      group: 'function',
    },
    {
      label: '频谱分析-功率谱',
      value: 'spectrum',
      type: 'def',
      group: 'function',
    },
  ];
  return {
    dndNodes,
  };
};

export default loadDndNodes;
