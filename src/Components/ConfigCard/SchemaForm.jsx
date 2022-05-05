import { Form, Input } from 'antd';

const SchemaForm = ({ node }) => {
  console.log(node);
  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item name="config">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default SchemaForm;
