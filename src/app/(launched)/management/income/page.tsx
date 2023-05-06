'use client';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import React from 'react';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const { Option } = Select;

const App: React.FC = () => {
  const [form] = Form.useForm();
  const onSelectChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="收入备注" name="tip" rules={[{ required: true, message: '输入不能为空' }]}>
        <Input placeholder="请输入收入备注" />
      </Form.Item>

      <Form.Item label="收入金额" name="num" rules={[{ required: true, message: '输入不能为空' }]}>
        <Input placeholder="请输入收入金额" />
      </Form.Item>

      <Form.Item label="收入日期" name="date" rules={[{ required: true, message: '输入不能为空' }]}>
        <DatePicker placeholder="请选择收入日期" />
      </Form.Item>

      <Form.Item name="type" label="收入类型" rules={[{ required: true }]}>
        <Select placeholder="请选择收入类型" onChange={onSelectChange} allowClear>
          <Option value="salary">工资收入</Option>
          <Option value="part-time">兼职收入</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
