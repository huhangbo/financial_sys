'use client';
import React, {useEffect, useState} from 'react';
import {Radio, Tabs, Table, Button, Form, Modal, Input, InputNumber, Select, DatePicker } from 'antd';
import {CrownFilled, DollarOutlined} from '@ant-design/icons'
import {request} from "@/utils/request";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';


const { Option } = Select;
const tabList = ["收支明细", "收支记账"]

const Edit: React.FC<any> = ({open, onCreate, onCancel, info, isAdd, list, setList, categoryMap}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    let tmpData = new Date(info.created_at)
    info.created_at = tmpData.toLocaleDateString()
    info.fee = Math.floor(info.fee)/100
    form.setFieldsValue(info)
  }, [info])
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
            if (!isAdd) {
              let tmpInfo = info
              tmpInfo.remark = values.remark
              tmpInfo.fee = parseInt(String(values.fee * 100))
              tmpInfo.category_id =  parseInt(values.category_id)
              tmpInfo.created_at = null
              console.log(tmpInfo)
              let res = request("post", "bill/update", tmpInfo)
              res.then(data => {
                let newList :any = []
                list.map((item :any) => {
                  if (item.bill_id === values.bill_id) {
                    item.remark = values.remark
                    item.fee = values.fee
                    item.category_id = values.category_id
                  }
                  newList.push(item)
                })
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

        <Form.Item name="bill_id" label="编号"
                   rules={[{ required: !isAdd, message: 'Please input the title of collection!' }]}
        >
          <Input disabled={true}/>
        </Form.Item>
        <Form.Item name="remark" label="备注"
                   rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item name="fee" label="金额"
                   rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <InputNumber prefix="￥" />
        </Form.Item>
        <Form.Item name="created_at" label="时间"
                   rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <Input type="textarea" disabled={!isAdd} />
        </Form.Item>
        <Form.Item name="category_id" label="类别"
                   rules={[{ required: true, message: 'Please input the detail of collection!' }]}
        >
          <Select placeholder="选择类别">
            {
              categoryMap.expend != undefined && info.bill_type == 1 ? Object.entries(categoryMap.expend).map((item :any) => {
                return (
                  <Option key={item[0]} value={parseInt(item[0])}>{item[1]}</Option>
                )
              }) : Object.entries(categoryMap.income).map((item :any) => {
                return (
                  <Option key={item[0]} value={parseInt(item[0])}>{item[1]}</Option>
                )
              })
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const List: React.FC<any>= ({categoryMap}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [list, setList] = useState([])
  const [open, setOpen] = useState(false);
  const [selectInfo, setSelectInfo] = useState({})
  const [isAdd, setIsAdd]= useState(false)
  const [selectTime, setSelectTime] = useState({})

  const userColumns = [
    {
      title: '编号',
      dataIndex: 'bill_id',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      editable: true
    },
    {
      title: '金额',
      dataIndex: '',
      render: (_: any, record: any) => {
        return (
          <div> {Math.floor(record.fee)/100} </div>
        )
      }
    },
    {
      title: '时间',
      dataIndex: '',
      render: (_: any, record: any) => {
        let tmpData = new Date(record.created_at)
        return (
          <div> {record.year.toString()+'/'+(record.month+1).toString()+'/'+record.day.toString()} </div>
        )
      }
    },
    {
      title: '收支类别',
      dataIndex: '',
      key: 'bill_id',
      render: (_: any, record: any) => {
        return (
          <div> {categoryMap.all[record.category_id]} </div>
        )
      }
    },
    { title: '操作',
      dataIndex: '',
      key: 'bill_id',
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
    let res = request('post', 'bill/list', selectTime)
    res.then(data => {
      setList(data)
    })
  }, [selectTime])

  const deleteItem = () => {
    let res = request('post', 'bill/delete', selectedRowKeys)
    res.then(data => {
      let newList : any = []
      list.map((item :any) => {
        if(!selectedRowKeys.includes(item.bill_id)){
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
        <DatePicker onPanelChange={ (date:dayjs.Dayjs, dataString: string) => {
          if (date == null) {
            setSelectTime({'year': 0, 'month': 0})
          } else {
            setSelectTime({'year': date.year(), 'month': date.month()})
          }
        }} picker="month" locale={locale}/>
        <Button type='default' style={{ marginLeft: 30 }}
                onClick={() => {
                  let res = request('post', 'bill/list', selectTime)
                  res.then(data => {
                    setList(data)
                  })}}> 查询 </Button>
      </div>
      <Table
        rowClassName="editable-row"
        rowKey={'bill_id'}
        rowSelection={rowSelection}
        columns={userColumns}
        pagination={{position: []}}
        dataSource={list} />
      <div style={{ marginTop: 16 }}>
        <Button type="primary" danger onClick={deleteItem} disabled={!hasSelected} style={{marginRight: 10 }}>
          删除
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `选择了 ${selectedRowKeys.length} 条记录` : ''}
        </span>
      </div>
      <Edit key = "form" open={open} onCreate={() => {setOpen(false)}} setList={setList} list={list}
            onCancel={() => {setOpen(false)}} info={selectInfo} isAdd={isAdd} categoryMap={categoryMap}/>
    </div>
  );
}

const Submit: React.FC<any>= ({categoryMap}) => {
  const [form] = Form.useForm();
  const [billType, setBillType] = useState(1)
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    let reqBody = {
      'bill_type': billType,
      'category_id': parseInt(values.category_id),
      'fee': parseInt(String(values.fee * 100)),
      'remark': values.remark,
      'month': values.time.month(),
      'year': values.time.year(),
      'day': values.time.day()
    }
    let res = request('post', 'bill/add', reqBody)
    res.then(data => {

    })
  };

  return (
    <>
      <Form
        form={form}
        name="register"
        title="新增记录"
        onFinish={onFinish}
        initialValues={{}}
        style={{ margin: '0 auto' }}
        scrollToFirstError>

        <Form.Item  name="bill_type" label="账单类型" rules={[{ required: true, message: '请选择类型'}]}>
          <Radio.Group options={[ { label: '支出', value: 1 }, { label: '收入', value: 2 },]}
                       onChange={({ target: { value } }) => {setBillType(value)}}
                       value={billType} optionType="button" />
        </Form.Item>

        <Form.Item
          name="remark"
          label="收支备注"
          rules={[{ required: true, message: 'Please input your username!'}]}>
          <Input />
        </Form.Item>

        <Form.Item name="fee" label="收支金额"
                   rules={[
                     {
                       required: true,
                       message: '请输入金额'
                     }
                   ]}>
          <InputNumber prefix="￥" style={{}} />
        </Form.Item>

        <Form.Item name="time" label="收支日期"
                   rules={[
                     {
                       required: true,
                       message: '请选择入日期'
                     }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item name="category_id" label="收支类别" rules={[
          {
            required: true,
            message: '请选择类别'
          }]}>
          <Select placeholder="请选择类别" style={{width: '30%'}}>
            {
              categoryMap != undefined && billType === 1 ? Object.entries(categoryMap.expend).map((item :any) => {
                return (
                  <Option key={item[0]} value={parseInt(item[0])}>{item[1]}</Option>
                )
              }) : Object.entries(categoryMap.income).map((item :any) => {
                return (
                  <Option key={item[0]} value={parseInt(item[0])}>{item[1]}</Option>
                )
              })
            }
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{margin: 10}}>
            提交记录
          </Button>
          <Button type='dashed' onClick={() => {form.resetFields()}} style={{margin: 10}}>
            重置信息
          </Button>
        </Form.Item>

      </Form>
    </>
  );
};

const App: React.FC<any>= () => {
  const [categoryMap, setCategoryMap] = useState({'all':{}, 'income': {}, 'expend': {}})
  useEffect(() => {
    let res = request('get','category/list')
    res.then(data => {
      let all :any  = {}
      let income :any = {}
      let expend :any = {}
      data.map((item :any) => {
        if (item.bill_type == 1) {
          expend[item.category_id] = item.category_detail
        } else if (item.bill_type == 2) {
          income[item.category_id] = item.category_detail
        }
        all[item.category_id] = item.category_detail
      })
      setCategoryMap({'all': all, 'income': income, 'expend': expend})
      console.log(categoryMap)
    })
  }, [])
  const tabIconMap :any = {
    0: <DollarOutlined />,
    1: <CrownFilled />,
  }
  const tabMap :any = {
    0: <List categoryMap={categoryMap}/>,
    1: <Submit categoryMap={categoryMap}/>
  }
  return (
    <div style={{ maxWidth: 1000, width: '80%', margin: '0 auto' }}>
      <Tabs
        defaultActiveKey="0"
        tabPosition={'left'}
        // style={{ height: 220 }}
        items={tabList.map((tab, i) => {
          const id = String(i);
          return {
            label: <span>
            {tabIconMap[i]}
              {tab}
          </span>,
            key: id,
            children: tabMap[i],
          };
        })}
      />
    </div>
  );
};

export default App;
