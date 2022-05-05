import { Form, Input, Button } from 'antd';

const SchemaForm = ({ node }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    node.data.configs = values;
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item name="test" label="Test">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" size="small" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SchemaForm;
