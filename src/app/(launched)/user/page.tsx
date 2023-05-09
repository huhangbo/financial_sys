// @ts-nocheck
'use client';
import {Button, Checkbox, Form, Input, Select, Modal, notification, InputNumber, Tabs} from 'antd';
import { useRouter } from 'next/navigation';
import React, {useState} from "react";
import {request} from "@/utils/request";
import cookie from "react-cookies";
import {useCookieEntry} from "@/utils/cookie";

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const openNotification = () => {
  notification.open({
    message: '成功',
    description: '修改成功',
    duration: 2,
    onClick: () => {
      console.log('点击了通知框');
    },
  });
};




const User = () => {
  let info = cookie.load('user')
  const [form] = Form.useForm();
  const [user, setUser] = useCookieEntry('user', {})
  const { replace, push } = useRouter();


  const items :any = [
    {
      key: '1',
      label: `个人信息`,
      children:
    <Form
      form={form}
      name="form_in_modal"
      initialValues={info}
      onFinish={(values: any) => {
        console.log('Received values of form: ', values);
        let res = request('post', 'user/update/info', values)
        res.then(data => {
          openNotification()
          setUser(data)
        })
      }}
    >

      <Form.Item name="user_id" label="编号"
                 rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Input disabled={true}/>
      </Form.Item>
      <Form.Item name="username" label="名称"
                 rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item name="gender" label="性别"
                 rules={[{ required: true, message: 'Please input the detail of collection!' }]}
      >
        <Select placeholder="select your gender">
          <Option value={1}>男</Option>
          <Option value={2}>女</Option>
        </Select>
      </Form.Item>
      <Form.Item name="telephone" label="电话"
                 rules={[{ required: true, message: 'Please input the detail of collection!' }]}
      >
        <Input type="textarea" disabled={true} />
      </Form.Item>
      <Form.Item name="email" label="邮箱"
                 rules={[{ required: true, message: 'Please input the detail of collection!' }]}
      >
        <Input type="textarea" />
      </Form.Item>
      <Form.Item>
        <div style={{ width: '20%', margin: '0 auto' }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%', margin: '0 auto' }}>
            修改信息
          </Button>
        </div>
      </Form.Item>
    </Form>
    },
    {
      key: '2',
      label: `修改密码`,
      children:
      <Form  initialValues={info}
        onFinish={(values) => {
          console.log(values)
          let res = request('post', 'user/update/password', values)
          res.then(data => {
            openNotification()
          })
      }}>
        <Form.Item name="telephone" label="原电话" rules={[{ required: true, message: '请输入电话' }]}>
          <Input style={{ width: '100%' }} disabled={true} />
        </Form.Item>
        <Form.Item
          name="old_password"
          label="旧密码"
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
          name="new_password"
          label="新密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请再次输入密码'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('old_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一样'));
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <div style={{ width: '20%', margin: '0 auto' }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%', margin: '0 auto' }}>
              修改密码
            </Button>
          </div>
        </Form.Item>
      </Form>
    },
  ];
  return (
    <div style={{width: '75%', maxWidth: 500, margin: '0 auto'}} >
      <Tabs items={items} onChange={()=>{}}  />
    </div>
  );
};

export default User;
