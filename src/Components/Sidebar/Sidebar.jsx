import React from 'react';
import './Sidebar.css';
import { Input } from 'antd';

const { Search } = Input;

const Sidebar = () => {
  const onDragStart = (event, nodeType, label) => {
    event.dataTransfer.setData('getNodeType', nodeType);
    event.dataTransfer.setData('getLabel', label);
    event.dataTransfer.effectAllowed = 'move';
  };
  const onSearch = value => console.log(value);
  return (
    <aside>
      <div className='search-bar'>
         <Search placeholder="搜索节点" onSearch={onSearch} />
      </div>
      <div className='group-name'>数据读取</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input', 'ZeroMQ')} draggable>
        ZeroMQ
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input', 'MQTT')} draggable>
        MQTT
      </div>
      <div className='group-name'>自定义函数</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', 'RMS 统计')} draggable>
        RMS 统计
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', '滤波-IIR 滤波')} draggable>
        滤波-IIR 滤波
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', '频谱分析-功率谱')} draggable>
        频谱分析-功率谱
      </div>
      <div className='group-name'>数据目标</div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output', 'MQTT')} draggable>
        MQTT
      </div>
      <div className='group-name'>图表展示</div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output', '折线图')} draggable>
        折线图
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output', '柱状图')} draggable>
        柱状图
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output', '热力图')} draggable>
        热力图
      </div>
    </aside>
  );
};

export default Sidebar;
