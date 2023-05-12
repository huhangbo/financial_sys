'use client';
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs, Table, Button, Form, Modal, Input, Select } from 'antd';
import { request } from '@/utils/request';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';
const tabList = ['用户管理', '分类管理', '新闻管理'];

const { Option } = Select;
const { TextArea } = Input;

const AdminUser: React.FC<any> = ({ open, onCreate, onCancel, info, isAdd, list, setList }) => {
  const [form] = Form.useForm();
  console.log(info);
  useEffect(() => {
    form.setFieldsValue(info);
  }, [info]);
  return (
    <Modal
      open={open}
      title="操作"
      okText="提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
            console.log(values);
            if (!isAdd) {
              let res = request('post', 'user/update/info', values);
              res.then((data) => {
                let newList: any = [];
                list.map((item: any) => {
                  if (item.user_id === values.user_id) {
                    item.username = values.username;
                    item.gender = values.gender;
                    item.email = values.email;
                  }
                  newList.push(item);
                });
                setList(newList);
              });
            } else {
              values.telephone = parseInt(values.telephone);
              values.user_id = null;
              let res = request('post', 'admin/user/add', values);
              res.then((data) => {
                let newList: any = [];
                list.map((item: any) => {
                  newList.push(item);
                });
                newList.push(data);
                setList(newList);
              });
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={info}>
        <Form.Item
          name="user_id"
          label="编号"
          rules={[{ required: !isAdd, message: 'Please input the title of collection!' }]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="username"
          label="名称"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="性别"
          rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <Select placeholder="select your gender">
            <Option value={1}>男</Option>
            <Option value={2}>女</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="telephone"
          label="电话"
          rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <Input type="textarea" disabled={!isAdd} />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
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
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectInfo, setSelectInfo] = useState({});
  const [isAdd, setIsAdd] = useState(false);

  const userColumns = [
    {
      title: '编号',
      dataIndex: 'user_id'
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
      dataIndex: 'password'
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'user_id',
      render: (_: any, record: any) => {
        return (
          <div>
            <Button
              type={'primary'}
              onClick={() => {
                setIsAdd(false);
                setSelectInfo(record);
                setOpen(true);
              }}
            >
              编辑
            </Button>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    let res = request('get', 'admin/user/get');
    res.then((data) => {
      setList(data);
    });
  }, []);

  const deleteUser = () => {
    let res = request('post', 'admin/user/delete', selectedRowKeys);
    res.then((data) => {
      let newList: any = [];
      list.map((item: any) => {
        if (!selectedRowKeys.includes(item.user_id)) {
          newList.push(item);
        }
      });
      setSelectedRowKeys([]);
      setList(newList);
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          danger
          onClick={deleteUser}
          disabled={!hasSelected}
          style={{ marginRight: 10 }}
        >
          删除
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setIsAdd(true);
            setSelectInfo({});
            setOpen(true);
          }}
        >
          新增
        </Button>
        <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 条记录` : ''}</span>
      </div>
      <Table
        rowClassName="editable-row"
        rowKey={'user_id'}
        rowSelection={rowSelection}
        columns={userColumns}
        pagination={{ position: [] }}
        dataSource={list}
      />
      <AdminUser
        key="form"
        open={open}
        onCreate={() => {
          setOpen(false);
        }}
        setList={setList}
        list={list}
        onCancel={() => {
          setOpen(false);
        }}
        info={selectInfo}
        isAdd={isAdd}
      />
    </div>
  );
};

const AdminNews: React.FC<any> = ({ open, onCreate, onCancel, info, isAdd, list, setList }) => {
  const [form] = Form.useForm();
  console.log(info);
  useEffect(() => {
    form.setFieldsValue(info);
  }, [info]);
  return (
    <Modal
      open={open}
      title="操作"
      okText="提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
            console.log(values);
            if (!isAdd) {
              let res = request('post', 'news/update', values);
              res.then((data) => {
                let newList: any = [];
                list.map((item: any) => {
                  if (item.news_id === values.news_id) {
                    item.title = values.title;
                    item.detail = values.detail;
                    item.source = values.source;
                  }
                  newList.push(item);
                });
                setList(newList);
              });
            } else {
              values.news_id = null;
              let res = request('post', 'news/add', values);
              res.then((data) => {
                let newList: any = [];
                list.map((item: any) => {
                  newList.push(item);
                });
                newList.push(data);
                setList(newList);
              });
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={info}>
        <Form.Item
          name="news_id"
          label="编号"
          rules={[{ required: !isAdd, message: 'Please input the title of collection!' }]}
        >
          <Input disabled={true} />
        </Form.Item>
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
          name="source"
          label="来源"
          rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const News: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectInfo, setSelectInfo] = useState({});
  const [isAdd, setIsAdd] = useState(false);

  const newsColumns = [
    {
      title: '编号',
      dataIndex: 'news_id'
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '正文',
      dataIndex: 'detail'
    },
    {
      title: '来源',
      dataIndex: 'source'
    },
    {
      title: '创建时间',
      dataIndex: 'created_at'
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'news_id',
      render: (_: any, record: any) => {
        return (
          <div>
            <Button
              type={'primary'}
              onClick={() => {
                setIsAdd(false);
                setSelectInfo(record);
                setOpen(true);
              }}
            >
              编辑
            </Button>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    let res = request('get', 'news/list');
    res.then((data) => {
      setList(data.news_list);
    });
  }, []);

  const deleteUser = () => {
    let res = request('post', 'news/delete', selectedRowKeys);
    res.then((data) => {
      let newList: any = [];
      list.map((item: any) => {
        if (!selectedRowKeys.includes(item.news_id)) {
          newList.push(item);
        }
      });
      setSelectedRowKeys([]);
      setList(newList);
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          danger
          onClick={deleteUser}
          disabled={!hasSelected}
          style={{ marginRight: 10 }}
        >
          删除
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setIsAdd(true);
            setSelectInfo({});
            setOpen(true);
          }}
        >
          新增
        </Button>
        <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 条记录` : ''}</span>
      </div>
      <Table
        rowClassName="editable-row"
        rowKey={'news_id'}
        rowSelection={rowSelection}
        columns={newsColumns}
        pagination={{ position: [] }}
        dataSource={list}
      />
      <AdminNews
        key="form"
        open={open}
        onCreate={() => {
          setOpen(false);
        }}
        setList={setList}
        list={list}
        onCancel={() => {
          setOpen(false);
        }}
        info={selectInfo}
        isAdd={isAdd}
      />
    </div>
  );
};

const AdminCategory: React.FC<any> = ({ open, onCreate, onCancel, info, isAdd, list, setList }) => {
  const [form] = Form.useForm();
  console.log(info);
  useEffect(() => {
    form.setFieldsValue(info);
  }, [info]);
  return (
    <Modal
      open={open}
      title="操作"
      okText="提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
            console.log(values);
            if (!isAdd) {
              let res = request('post', 'category/update', values);
              res.then((data) => {
                let newList: any = [];
                list.map((item: any) => {
                  if (item.category_id === values.category_id) {
                    item.category_detail = values.category_detail;
                  }
                  newList.push(item);
                });
                setList(newList);
              });
            } else {
              values.category_id = null;
              let res = request('post', 'category/add', values);
              res.then((data) => {
                let newList: any = [];
                list.map((item: any) => {
                  newList.push(item);
                });
                newList.push(data);
                setList(newList);
              });
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={info}>
        <Form.Item
          name="category_id"
          label="编号"
          rules={[{ required: !isAdd, message: 'Please input the title of collection!' }]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="category_detail"
          label="内容"
          rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="bill_type"
          label="类型"
          rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <Select placeholder="选择账单类型" disabled={!isAdd}>
            <Option value={1}>支出</Option>
            <Option value={2}>收入</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const Category: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectInfo, setSelectInfo] = useState({});
  const [isAdd, setIsAdd] = useState(false);

  const newsColumns = [
    {
      title: '编号',
      dataIndex: 'category_id'
    },
    {
      title: '内容',
      dataIndex: 'category_detail'
    },
    {
      title: '类型',
      dataIndex: 'bill_type'
    },
    {
      title: '创建时间',
      dataIndex: 'created_at'
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'news_id',
      render: (_: any, record: any) => {
        return (
          <div>
            <Button
              type={'primary'}
              onClick={() => {
                setIsAdd(false);
                setSelectInfo(record);
                setOpen(true);
              }}
            >
              编辑
            </Button>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    let res = request('get', 'category/list');
    res.then((data) => {
      setList(data);
    });
  }, []);

  const deleteUser = () => {
    let res = request('post', 'news/delete', selectedRowKeys);
    res.then((data) => {
      let newList: any = [];
      list.map((item: any) => {
        if (!selectedRowKeys.includes(item.category_id)) {
          newList.push(item);
        }
      });
      setSelectedRowKeys([]);
      setList(newList);
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          danger
          onClick={deleteUser}
          disabled={!hasSelected}
          style={{ marginRight: 10 }}
        >
          删除
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setIsAdd(true);
            setSelectInfo({});
            setOpen(true);
          }}
        >
          新增
        </Button>
        <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 条记录` : ''}</span>
      </div>
      <Table
        rowClassName="editable-row"
        rowKey={'category_id'}
        rowSelection={rowSelection}
        columns={newsColumns}
        pagination={{ position: [] }}
        dataSource={list}
      />
      <AdminCategory
        key="form"
        open={open}
        onCreate={() => {
          setOpen(false);
        }}
        setList={setList}
        list={list}
        onCancel={() => {
          setOpen(false);
        }}
        info={selectInfo}
        isAdd={isAdd}
      />
    </div>
  );
};

const App: React.FC<any> = () => {
  const [mode, setMode] = useState<TabPosition>('top');
  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };
  const elementMap: any = {};
  elementMap[0] = <User />;
  elementMap[1] = <Category />;
  elementMap[2] = <News />;
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
            children: elementMap[i]
          };
        })}
      />
    </div>
  );
};
export default App;
