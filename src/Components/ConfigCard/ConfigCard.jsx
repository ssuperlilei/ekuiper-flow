import React from 'react';
import './ConfigCard.less';
import SchemaForm from './SchemaForm';
import { SaveOutlined, PlayCircleOutlined, UndoOutlined, RedoOutlined, CloudUploadOutlined } from '@ant-design/icons';

const ConfigCard = ({ node, save }) => {
  const getConfigCard = () => {
    if (!node) return <div className="config-title">请选择节点进行配置</div>;
    return (
      <div>
        <div className="config-title">{node.data.label}</div>
        <SchemaForm node={node} />
      </div>
    );
  };
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
      <div className="config-body">{getConfigCard()}</div>
    </aside>
  );
};

export default ConfigCard;
