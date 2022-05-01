/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './ConfigCard.less';
import MqttCard from './Mqtt';
import { SaveOutlined, PlayCircleOutlined, UndoOutlined, RedoOutlined, CloudUploadOutlined } from '@ant-design/icons';

const ConfigCard = ({ node }) => {
  const getConfigCard = () => {
    if (!node) return <div className="config-title">请选择节点进行配置</div>;
    console.log(node.data.label);
    if (node.data.label === 'MQTT') {
      return <MqttCard />;
    } else {
      return <div className="config-title">{node.data.label}</div>;
    }
  };
  return (
    <aside className="config-card">
      <div className="config-header">
        <a>
          <SaveOutlined style={{ fontSize: '20px' }} />
        </a>
        <a>
          <CloudUploadOutlined style={{ fontSize: '20px' }} />
        </a>
        <a>
          <PlayCircleOutlined style={{ fontSize: '20px' }} />
        </a>
        <a>
          <UndoOutlined style={{ fontSize: '20px' }} />
        </a>
        <a>
          <RedoOutlined style={{ fontSize: '20px' }} />
        </a>
      </div>
      <div className="config-body">{getConfigCard()}</div>
    </aside>
  );
};

export default ConfigCard;
