// @ts-nocheck
'use client';
import { Button, Checkbox, Form, Input, Select, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import React, {useState} from "react";
import {request} from "@/utils/request";
import cookie from "react-cookies";

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}



const User = () => {
  let info = cookie.load('user')
  const [form] = Form.useForm();
  const { replace, push } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    let res = request('post', 'user/update/info', reqBody)
    res.then(data => {
      showModal()
    })
  };

  return (
    <div style={{width: '75%', maxWidth: 600, margin: '0 auto'}} >
    <Form
      form={form}
      // layout="vertical"
      name="form_in_modal"
      initialValues={info}
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
        <Input type="textarea" />
      </Form.Item>
      <Form.Item name="email" label="邮箱"
                 rules={[{ required: true, message: 'Please input the detail of collection!' }]}
      >
        <Input type="textarea" />
      </Form.Item>
      <Form.Item name="password" label="密码"
                 rules={[{ required: true, message: 'Please input the detail of collection!' }]}
      >
        <Input type="textarea" disabled={true} />
      </Form.Item>
      <Form.Item>
        <div style={{ width: '20%', margin: '0 auto' }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%', margin: '0 auto' }}>
            修改信息
          </Button>
        </div>

      </Form.Item>
    </Form>
    </div>
  );
};

export default User;
