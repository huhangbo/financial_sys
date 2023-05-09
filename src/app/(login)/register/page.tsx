'use client';
import { Button,  Form, Input, Select, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import {useState} from "react";
import {request} from "@/utils/request";

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

const Register = () => {
  const [form] = Form.useForm();
  const { replace} = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    toLogin()
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    let reqBody = {
      "username": values.username,
      "gender": values.gender,
      "email": values.email,
      "telephone": parseInt(values.telephone),
      "password": values.password
    }
    let res = request('post', 'user/register', reqBody)
    res.then(data => {
      showModal()
    })
  };
  const toLogin = () => {
    replace('/login');
  };

  return (
    <div style={{ width: '75%', maxWidth: 800, margin: '0 auto', paddingTop: 25 }}>
      <center>注册</center>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        title="用户注册"
        onFinish={onFinish}
        style={{ marginTop: 25}}
      >
        <Form.Item
          name="username"
          label="名称"
          tooltip="输入用户名用于标识登录"
          rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
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

        <Form.Item name="telephone" label="电话" rules={[{ required: true, message: '请输入电话' }]}>
          <Input style={{ width: '100%' }} />
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
            <Option value={1}>男</Option>
            <Option value={2}>女</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%', margin: '0 auto' }}>
            注册
          </Button>
          <Button type="link" onClick={toLogin} style={{ width: '100%', margin: '0 auto' }}>
            点击去登录
          </Button>
        </Form.Item>
        <Modal title="成功" open={isModalOpen} onOk={handleOk}>
          <p>注册成功，点击前去登录</p>
        </Modal>
      </Form>
    </div>

  );
};

export default Register;
