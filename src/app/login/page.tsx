'use client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const { replace } = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const toRegister = () => {
    replace('/register');
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ maxWidth: 600, width: '75%', margin: '0 auto' }}
    >
      <Form.Item label="用户" name="username" rules={[{ required: true, message: '用户名不能为空' }]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          value={username}
          onChange={handleUsernameChange}
        />
      </Form.Item>

      <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码不能为空' }]}>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', margin: '0 auto' }}>
          登录
        </Button>
        <Button type="link" onClick={toRegister} style={{ width: '100%', margin: '0 auto' }}>
          点击注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
