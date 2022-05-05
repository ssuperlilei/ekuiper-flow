import React from 'react';
import './Sidebar.less';
import { Input } from 'antd';
import loadDndNodes from '../../Utils/loadDndNodes';

const { Search } = Input;

const Sidebar = () => {
  const onDragStart = (event, node) => {
    event.dataTransfer.setData('getNodeName', node.value);
    event.dataTransfer.setData('getNodeLabel', node.label);
    event.dataTransfer.setData('getNodeType', node.type);
    event.dataTransfer.effectAllowed = 'move';
  };
  const onSearch = (value) => console.log(value);
  const { dndNodes, groups } = loadDndNodes();
  const renderDndNodes = () => {
    return groups.map((group) => {
      const groupNodes = dndNodes.filter((dndNode) => dndNode.group === group.groupValue);
      const dndNodeByGroup = groupNodes.map((node) => (
        <div
          className={['dndnode', node.type].join(' ')}
          draggable
          key={`${node.value}-${node.type}`}
          onDragStart={(event) => onDragStart(event, node)}
        >
          <div className="dnd-node-label">{node.label}</div>
        </div>
      ));
      return (
        <div key={group.groupValue}>
          <div className="group-name">{group.groupName}</div>
          <div>{dndNodeByGroup}</div>
        </div>
      );
    });
  };
  return (
    <aside>
      <div className="search-bar">
        <Search placeholder="搜索节点" onSearch={onSearch} />
      </div>
      <div>{renderDndNodes()}</div>
    </aside>
  );
};

export default Sidebar;
