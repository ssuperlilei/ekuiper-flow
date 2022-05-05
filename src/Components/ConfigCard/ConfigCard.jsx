import React from 'react';
import './ConfigCard.less';
import MqttCard from './Mqtt';
import { SaveOutlined, PlayCircleOutlined, UndoOutlined, RedoOutlined, CloudUploadOutlined } from '@ant-design/icons';

const ConfigCard = ({ node }) => {
  const getConfigCard = () => {
    if (!node) return <div className="config-title">请选择节点进行配置</div>;
    if (node.data.name === 'mqtt') {
      return <MqttCard />;
    } else {
      return <div className="config-title">{node.data.label}</div>;
    }
  };
  const iconStyles = { fontSize: '20px' };
  return (
    <aside className="config-card">
      <div className="config-header">
        <a>
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
