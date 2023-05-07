'use client';
// @ts-nocheck
import React, {useEffect, useState} from 'react';
import type { RadioChangeEvent } from 'antd';
import {Radio, Tabs, Table, Button, Form, Modal, Input, InputNumber, Popconfirm, Typography, Select} from 'antd';
import {ColumnsType} from "antd/es/table";
import {request} from "@/utils/request";

type TabPosition = 'left' | 'right' | 'top' | 'bottom';
const tabList = ["用户管理", "分类管理", "新闻管理"]

const { Option } = Select;

const AdminEdit: React.FC<any> = ({open, onCreate, onCancel, info, isAdd, list, setList}) => {
  const [form] = Form.useForm();
  console.log(info)
  useEffect(() => {
    form.setFieldsValue(info)
  }, [info])
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
            if (!isAdd) {
              let res = request("post", "/user/update", values)
              res.then(data => {
                let newList :any = []
                list.map(item => {
                  if (item.user_id === info.user_id) {
                    item.username = info.username
                    item.gender = info.gender
                    item.email = info.email
                  }
                  newList.push(item)
                })
                setList(newList)
              })
            } else {
              let res = request("post", "admin/user/add", values)
              res.then(data => {
                let newList = list.push(data)
                setList(newList)
              })
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={info}
      >
        <Form.Item name="username" label="用户名"
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
          <Input type="textarea" disabled={!isAdd} />
        </Form.Item>
        <Form.Item name="email" label="邮箱"
                   rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="password" label="密码"
                   rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <Input type="textarea" disabled={!isAdd} />
        </Form.Item>
      </Form>
    </Modal>
  );
};


const User: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [list, setList] = useState([])
  const [open, setOpen] = useState(false);
  const [selectInfo, setSelectInfo] = useState({})
  const [isAdd, setIsAdd]= useState(false)

  const userColumns = [
    {
      title: '编号',
      dataIndex: 'user_id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      editable: true
    },
    {
      title: '性别',
      dataIndex: 'gender',
      editable: true
    },
    {
      title: '电话',
      dataIndex: 'telephone',
      editable: true
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      editable: true
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    { title: '操作',
      dataIndex: '',
      key: 'user_id',
      render: (_: any, record: any) => {
        return  (
          <div>
            <Button type={"primary"} onClick={() => {setIsAdd(false); setSelectInfo(record); setOpen(true)} }>编辑</Button>
          </div>
        );
      },
    }
  ];

  useEffect(() => {
    let res = request('get', 'admin/user/get')
    res.then(data => {
      setList(data)
    })
  }, [])

  const deleteUser = () => {
    let res = request('post', 'admin/user/delete', selectedRowKeys)
    res.then(data => {
      let newList : any = []
      list.map(item => {
        if(!selectedRowKeys.includes(item.user_id)){
          newList.push(item)
        }
      })
      setSelectedRowKeys([])
      setList(newList)
    })
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" danger onClick={deleteUser} disabled={!hasSelected} style={{marginRight: 10 }}>
          删除
        </Button>
        <Button type="primary" onClick={() => {setIsAdd(true); setSelectInfo({}); setOpen(true)}}>
          新增
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `选择了 ${selectedRowKeys.length} 条记录` : ''}
        </span>
      </div>
      <Table
        components={{
        body: {
          cell: EditableCell,
        },}}
        rowClassName="editable-row"
        rowKey={'user_id'}
        rowSelection={rowSelection}
        columns={userColumns}
        pagination={{position: ['none']}}
        dataSource={list} />
      <AdminEdit key = "form" open={open} onCreate={() => {setOpen(false)}} setList={setList} list={list}
                 onCancel={() => {setOpen(false)}} info={selectInfo} isAdd={isAdd}/>
    </div>
  );
}

const EditableCell: React.FC<any>= ({editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


const App: React.FC<any>= () => {
  const [mode, setMode] = useState<TabPosition>('top');
  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
        <Radio.Button value="top">水平</Radio.Button>
        <Radio.Button value="left">垂直</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        // style={{ height: 220 }}
        items={tabList.map((tab, i) => {
          const id = String(i);
          return {
            label: tab,
            key: id,
            children: <User/>,
          };
        })}
      />
    </div>
  );
};
export default App;
