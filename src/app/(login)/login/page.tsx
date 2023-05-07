'use client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Switch } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {request} from "@/utils/request";
import {useCookieEntry} from '@/utils/cookie'

const Login = () => {
  const { replace, push, refresh } = useRouter();
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookieEntry('token', "")
  const [user, setUser] = useCookieEntry('user', {})
  const [isAdmin, setIsAdmin] = useState(false)

  const onFinish = (values: any) => {
    values.telephone =  parseInt(values.telephone)
    if (isAdmin) {
      let res =  request("post", "/admin/login", values)
      res.then(data => {
        setToken(data.token)
        push('/admin/user')
      }).catch(err => {
        replace('/login')
      })
    } else {
      let res =  request("post", "/user/login", values)
      res.then(data => {
        setToken(data.token)
        setUser(data.user)
        push('/note')
      }).catch(err => {
        replace('/login')
      })
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleUsernameChange = (e: any) => {
    setTelephone(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const toRegister = () => {
   push('/register');
  };

  return (
    <Form
      title="用户登录"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ maxWidth: 600, width: '75%', margin: '0 auto' }}
    >
      <Form.Item label="电话" name="telephone" rules={[{ required: true, message: '电话不能为空' }]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          value={telephone}
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
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => replace('/management/detail')}
          style={{ width: '100%', margin: '0 auto' }}
        >
          登录
        </Button>
        <Button type="link" onClick={toRegister} style={{ width: '100%', margin: '0 auto' }}>
          点击去注册
        </Button>
      </Form.Item>
      <Form.Item valuePropName="isAdmin">
        <Switch checkedChildren="管理员" unCheckedChildren="用户" defaultChecked={false} onChange={ (checked, event) => {
          setIsAdmin(checked)
        } } />
      </Form.Item>
    </Form>
  );
};

export default Login;
