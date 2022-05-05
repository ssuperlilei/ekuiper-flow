import React from 'react';
import { Form, Input, Button, Switch, InputNumber } from 'antd';
import Schema from '../../assets/Schema.json';
import _ from 'lodash';
import TextArea from 'antd/lib/input/TextArea';

const SchemaForm = ({ node }) => {
  const lang = 'zh';
  const [form] = Form.useForm();
  const _schema = Schema[node.data.nodeType];
  const currentSchema = _schema[node.data.name];
  let schemaDesc = '';
  let schemaFormItem = <div></div>;
  const getFormItems = ({ type }) => {
    switch (type) {
      case 'string':
        return <Input />;
      case 'bool':
        return <Switch />;
      case 'int':
        return <InputNumber min={0} />;
      default:
        break;
    }
  };
  if (currentSchema.about) {
    schemaDesc = currentSchema.about.description[lang];
  }
  if (currentSchema.properties && currentSchema.properties.default) {
    const formItems = currentSchema.properties.default;
    schemaFormItem = formItems.map((formItem, index) => {
      return (
        <Form.Item
          key={`${formItem.name}_${index}`}
          name={formItem.name}
          label={formItem.label[lang]}
          valuePropName={formItem.type === 'bool' ? 'checked' : undefined}
        >
          {getFormItems(formItem)}
        </Form.Item>
      );
    });
  } else if (currentSchema.functions) {
    schemaFormItem = currentSchema.functions.map((func) => {
      return (
        <Form.Item key={func.name} name="expr" label={`${func.name} 函数表达式`}>
          <TextArea placeholder={func.example} autoSize={{ maxRows: 16, minRows: 8 }} />
        </Form.Item>
      );
    });
  } else {
    schemaFormItem = <p>暂无配置项</p>;
  }
  const onFinish = (values) => {
    node.data.configs = _.cloneDeep(values);
  };
  return (
    <div className="schema-form">
      <p className="schema-form-desc">{schemaDesc}</p>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={node.data.configs}
        autoComplete="off"
        form={form}
        onFinish={onFinish}
      >
        {schemaFormItem}
        <Form.Item>
          <Button type="primary" size="small" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SchemaForm;
