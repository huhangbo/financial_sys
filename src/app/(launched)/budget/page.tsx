'use client';
import { Button, Col, DatePicker, Row, Statistic, Card, Divider, InputNumber, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from '@/utils/request';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { Pie } from '@ant-design/plots';

const App: React.FC = () => {
  const [bill, setBill] = useState({ expend: 0, income: 0 });
  const [selectTime, setSelectTime] = useState({ year: 2023, month: 4 });
  const [budget, setBudget] = useState({ fee: 0, budget_id: 0 });
  let tmpValue = 0;
  useEffect(() => {
    let resBill = request('post', 'bill/list', selectTime);
    let resBudget = request('post', 'budget/get', selectTime);
    resBill.then((data) => {
      let expend = 0;
      let income = 0;
      data.map((item: any) => {
        if (item.bill_type == 1) {
          expend += item.fee;
        } else {
          income += item.fee;
        }
      });
      setBill({ expend: expend, income: income });
    });
    resBudget
      .then((data) => {
        setBudget(data);
      })
      .catch((err) => {
        setBudget({ fee: 0, budget_id: 0 });
      });
  }, [selectTime]);
  const data = [
    {
      type: '消费',
      value: Math.floor(bill.expend) / 100
    },
    {
      type: '剩余',
      value: Math.floor(budget.fee - bill.expend) / 100
    }
  ];
  const config: any = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center'
      }
    },
    interactions: [
      {
        type: 'element-active'
      }
    ]
  };

  return (
    <div style={{ width: '80%', maxWidth: 800, margin: '0 auto' }}>
      <Row gutter={8}>
        <Col span={4}>
          <Row gutter={4}>
            <Col span={24}>
              <DatePicker
                onPanelChange={(date: dayjs.Dayjs, dataString: string) => {
                  if (date == null) {
                    setSelectTime({ year: 0, month: 0 });
                  } else {
                    setSelectTime({ year: date.year(), month: date.month() });
                  }
                }}
                picker="month"
                defaultValue={dayjs('2023-05', 'YYYY-MM')}
                locale={locale}
                style={{ marginBottom: 10 }}
              />
            </Col>
            <Col span={12}>
              <Statistic title="收入(元)" value={Math.floor(bill.income) / 100} precision={2} />
            </Col>
            <Col span={12}>
              <Statistic title="支出(元)" value={Math.floor(bill.expend) / 100} precision={2} />
            </Col>
            <Col span={24} push={4}>
              <Statistic title="结余(元)" value={Math.floor(bill.income - bill.expend) / 100} precision={2} />
            </Col>
          </Row>
        </Col>
        <Col span={1}>
          <Divider type={'vertical'} />
        </Col>
        <Col span={18}>
          <Row>
            <Col span={24}>
              <p>消费预算</p>
            </Col>
            <Col span={24}>{budget.fee !== 0 && <Pie {...config} />}</Col>
            <Col span={6} push={7}>
              <Statistic
                title="预算(元)"
                value={Math.floor(budget.fee) / 100}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
              />
            </Col>
            <Col span={10} push={5}>
              <InputNumber
                addonBefore="￥"
                style={{ width: '100%' }}
                onChange={(value: any) => {
                  tmpValue = value;
                }}
              />
              <div>
                <Button
                  type={'primary'}
                  style={{ width: '50%' }}
                  onClick={() => {
                    if (budget.budget_id == 0) {
                      let reqBody = {
                        fee: parseInt(String(tmpValue * 100)),
                        year: selectTime.year,
                        month: selectTime.month
                      };
                      let res = request('post', 'budget/add', reqBody);
                      res.then((data) => {
                        setBudget(data);
                      });
                    } else {
                      let tmpBudget = JSON.parse(JSON.stringify(budget));
                      tmpBudget.fee = parseInt(String(tmpValue * 100));
                      console.log(tmpBudget);
                      let res = request('post', 'budget/update', tmpBudget);
                      res.then((data: any) => {
                        setBudget(tmpBudget);
                      });
                    }
                  }}
                >
                  设置
                </Button>
                <Button
                  type={'primary'}
                  danger={true}
                  style={{ width: '50%' }}
                  onClick={() => {
                    let res = request('post', 'budget/delete', budget);
                    res.then((data: any) => {
                      setBudget({ fee: 0, budget_id: 0 });
                    });
                  }}
                >
                  删除
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default App;
