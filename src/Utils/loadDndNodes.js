import Schema from '../assets/Properties.json';

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
    // {
    //   groupName: '图表展示',
    //   groupValue: 'chart',
    // },
  ];
  const sourceDndNodes = Object.keys(Schema.source).map((key) => ({
    value: key,
    label: key,
    type: 'input',
    group: 'source',
  }));
  const sinkDndNodes = Object.keys(Schema.sink).map((key) => ({
    value: key,
    label: key,
    type: 'output',
    group: 'sink',
  }));
  const functionDndNodes = Object.keys(Schema.function).map((key) => ({
    value: key,
    label: key,
    type: 'default',
    group: 'function',
  }));
  const dndNodes = [...sourceDndNodes, ...sinkDndNodes, ...functionDndNodes];
  return {
    groups,
    dndNodes,
  };
};

export default loadDndNodes;
