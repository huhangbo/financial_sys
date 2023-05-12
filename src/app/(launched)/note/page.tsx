// @ts-nocheck
'use client';
import { Button, Form, Input, Modal, Space, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { request } from '@/utils/request';

const { TextArea } = Input;
interface Notes {
  notes_id?: number;
  user_id?: number;
  title?: string;
  detail?: string;
  created_at?: string;
  updated_at?: string;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="新建备忘录"
      okText="提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
            let res = request('post', 'notes/add', values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="detail"
          label="正文"
          rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="place"
          label="地点"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function Notes() {
  const [list, setList] = useState<Notes[]>([]);
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  useEffect(() => {
    let res = request('get', 'notes/list');
    res.then((data) => {
      console.log(data);
      setList(data.notes_list);
    });
  }, []);
  return (
    <ProList<Notes>
      rowKey="notes_id"
      headerTitle="备忘录"
      dataSource={list}
      showActions="hover"
      toolBarRender={() => {
        return [
          <Button key="button" type="primary" onClick={() => setOpen(true)}>
            新建
          </Button>,
          <CollectionCreateForm
            key="form"
            open={open}
            onCreate={onCreate}
            onCancel={() => {
              setOpen(false);
            }}
          />
        ];
      }}
      editable={{
        onSave: async (key, record, originRow) => {
          let res = request('post', 'notes/update', record);
          return true;
        },
        onDelete: async (key, record) => {
          let res = request('post', 'notes/delete', [key]);
          return true;
        }
      }}
      onDataSourceChange={setList}
      metas={{
        title: {
          dataIndex: 'title'
        },
        description: {
          dataIndex: 'detail'
        },
        subTitle: {
          render: () => {
            return (
              <Space size={0}>
                <Tag color="blue">Ant Design</Tag>
              </Space>
            );
          }
        },
        actions: {
          render: (text, row, index, action) => [
            <a
              onClick={() => {
                action?.startEditable(row.notes_id);
              }}
              key="link"
            >
              编辑
            </a>
          ]
        }
      }}
    />
  );
}
