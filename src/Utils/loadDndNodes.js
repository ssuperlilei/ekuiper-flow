const loadDndNodes = () => {
  const groups = [
    {
      groupName: '数据源',
      groupValue: 'source',
    },
    {
      groupName: '数据目标',
      groupValue: 'sink',
    },
    {
      groupName: '自定义函数',
      groupValue: 'function',
    },
    {
      groupName: '图表展示',
      groupValue: 'chart',
    },
  ];
  const dndNodes = [
    {
      label: 'ZeroMQ',
      value: 'zmq',
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
      label: 'Log',
      value: 'log',
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
      type: 'default',
      group: 'function',
    },
    {
      label: '频谱分析-功率谱',
      value: 'spectrum',
      type: 'default',
      group: 'function',
    },
    {
      label: '折线图',
      value: 'line',
      type: 'output',
      group: 'chart',
    },
    {
      label: '热力图',
      value: 'heatmap',
      type: 'output',
      group: 'chart',
    },
  ];
  return {
    groups,
    dndNodes,
  };
};

export default loadDndNodes;
