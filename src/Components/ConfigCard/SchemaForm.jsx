import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Switch, InputNumber, message } from 'antd';
import Schema from '../../assets/Schema.json';
import _ from 'lodash';
import TextArea from 'antd/lib/input/TextArea';

const SchemaForm = ({ node }) => {
  const lang = 'zh';
  const [form] = Form.useForm();
  const [schema, setSchema] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [schemaDesc, setSchemaDesc] = useState('');
  useEffect(() => {
    if (node) {
      const _schema = Schema[node.data.nodeType];
      const currentSchema = _schema[node.data.name];
      setInitialValues(node.data.configs);
      setSchema(currentSchema);
      setSchemaDesc(currentSchema.about.description[lang]);
    }
  });
  useEffect(() => {
    if (schema) {
      form.resetFields();
    }
  }, [schema]);
  const getFormItems = (formItem) => {
    switch (formItem.type) {
      case 'string':
        return <Input placeholder={formItem.default} />;
      case 'bool':
        return <Switch />;
      case 'int':
        return <InputNumber min={0} placeholder={formItem.default} />;
      default:
        break;
    }
  };
  const setFormItemByProps = (schema) => {
    let schemaFormItems = null;
    if (schema.properties && schema.properties.default) {
      const formItems = schema.properties.default;
      schemaFormItems = formItems.map((formItem, index) => {
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
    } else if (schema.functions) {
      schemaFormItems = schema.functions.map((func) => {
        return (
          <Form.Item key={func.name} name="expr" label={`${func.name} 函数表达式`}>
            <TextArea placeholder={func.example} autoSize={{ maxRows: 16, minRows: 8 }} />
          </Form.Item>
        );
      });
    } else {
      return <p>暂无配置项</p>;
    }
    return (
      <>
        {schemaFormItems}
        <Form.Item>
          <Button type="primary" size="small" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </>
    );
  };
  const onFinish = (values) => {
    node.data.configs = _.cloneDeep(values);
    setInitialValues(values);
    message.success(`${node.data.name} 配置保存成功`);
  };
  return (
    <div className="schema-form">
      <p className="schema-form-desc">{schemaDesc}</p>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={initialValues}
        autoComplete="off"
        form={form}
        onFinish={onFinish}
      >
        {setFormItemByProps(schema)}
      </Form>
    </div>
  );
};

export default SchemaForm;
