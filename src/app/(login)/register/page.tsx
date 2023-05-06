'use client';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useRouter } from 'next/navigation';

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const Register = () => {
  const [form] = Form.useForm();
  const { replace } = useRouter();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const toLogin = () => {
    replace('/login');
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      title="用户注册"
      onFinish={onFinish}
      initialValues={{ prefix: '86' }}
      style={{ width: '75%', maxWidth: 600, margin: '0 auto' }}
      scrollToFirstError
    >
      <Form.Item
        name="nickname"
        label="用户名"
        tooltip="输入用户名用于标识登录"
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码'
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次输入密码'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一样'));
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="phone" label="电话" rules={[{ required: true, message: '请输入电话' }]}>
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            message: '邮箱格式不对'
          },
          {
            required: true,
            message: '请输入邮箱'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="gender" label="性别" rules={[{ required: true, message: '请选择性别' }]}>
        <Select placeholder="select your gender">
          <Option value="male">男</Option>
          <Option value="female">女</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))
          }
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', margin: '0 auto' }}>
          注册
        </Button>
        <Button type="link" onClick={toLogin} style={{ width: '100%', margin: '0 auto' }}>
          点击去登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
