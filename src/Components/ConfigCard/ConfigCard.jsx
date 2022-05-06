import React, { useEffect, useState } from 'react';
import './ConfigCard.less';
import SchemaForm from './SchemaForm';
import { SaveOutlined, PlayCircleOutlined, UndoOutlined, RedoOutlined, CloudUploadOutlined } from '@ant-design/icons';

const ConfigCard = ({ node, save }) => {
  const [title, setTitle] = useState('');
  const [currNode, setCurrNode] = useState();
  let schemaForm = null;
  useEffect(() => {
    if (!node) {
      setTitle('请选择节点进行配置');
    } else {
      setTitle(node.data.label);
      setCurrNode(node);
    }
  });
  const iconStyles = { fontSize: '20px' };
  return (
    <aside className="config-card">
      <div className="config-header">
        <a onClick={save}>
          <SaveOutlined style={iconStyles} />
        </a>
        <a>
          <CloudUploadOutlined style={iconStyles} />
        </a>
        <a>
          <PlayCircleOutlined style={iconStyles} />
        </a>
        <a>
          <UndoOutlined style={iconStyles} />
        </a>
        <a>
          <RedoOutlined style={iconStyles} />
        </a>
      </div>
      <div className="config-body">
        <div className="config-title">{title}</div>
        <SchemaForm node={currNode} />
      </div>
    </aside>
  );
};

export default ConfigCard;
