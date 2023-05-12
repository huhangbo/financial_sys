// @ts-nocheck
'use client';

import { Tabs, Radio, DatePicker, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { Line, Column, Bar } from '@ant-design/plots';
import { request } from '@/utils/request';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { RangePicker } = DatePicker;
const Year = () => {
  const [data, setData] = useState([]);
  const [selectTime, setSelectTime] = useState({ year: 2023 });

  useEffect(() => {
    let ret = request('post', 'bill/statistic', selectTime);
    ret.then((data) => {
      let tmpList = [];
      data.map((item: any) => {
        item.fee = Math.floor(item.fee) / 100;
        item.month = String(item.month.toString());
        tmpList.push(item);
      });
      console.log(tmpList);
      setData(tmpList);
    });
  }, [selectTime]);

  const config = {
    data,
    isGroup: true,
    xField: 'month',
    yField: 'fee',
    seriesField: 'bill_type_name'
  };

  return (
    <div>
      <div style={{ marginBottom: 6 }}>
        <DatePicker
          locale={locale}
          onChange={(value) => {
            setSelectTime({ year: value.year() });
          }}
          picker="year"
          defaultValue={dayjs('2023', 'YYYY')}
        />
      </div>
      <Column {...config} />
    </div>
  );
};

const Month = () => {
  const [data, setData] = useState([]);
  const [selectTime, setSelectTime] = useState({ year: 2023, month: 4 });

  useEffect(() => {
    let ret = request('post', 'bill/statistic', selectTime);
    ret.then((data) => {
      let tmpList = [];
      data.map((item: any) => {
        item.fee = Math.floor(item.fee) / 100;
        item.day = item.day.toString();
        tmpList.push(item);
      });
      console.log(tmpList);
      setData(tmpList);
    });
  }, [selectTime]);

  const config = {
    data,
    isGroup: true,
    xField: 'day',
    yField: 'fee',
    seriesField: 'bill_type_name'
  };

  return (
    <div>
      <div style={{ marginBottom: 6 }}>
        <DatePicker
          locale={locale}
          onChange={(value) => {
            setSelectTime({ year: value.year(), month: value.month() });
          }}
          picker="month"
          defaultValue={dayjs('2023-05', 'YYYY-MM')}
        />
      </div>
      <Line {...config} />
    </div>
  );
};

const ByTime = () => {
  const [data, setData] = useState([]);
  const [selectTime, setSelectTime] = useState({
    begin_time: new Date(2023, 0, 1),
    end_time: new Date(2023, 11, 31)
  });

  useEffect(() => {
    let ret = request('post', 'bill/statistic', selectTime);
    ret.then((data) => {
      let tmpList = [];
      data.map((item: any) => {
        item.fee = Math.floor(item.fee) / 100;
        tmpList.push(item);
      });
      console.log(tmpList);
      setData(tmpList);
    });
  }, [selectTime]);

  const config = {
    data,
    xField: 'fee',
    yField: 'category_name',
    isGroup: true,
    seriesField: 'bill_type_name',
    colorField: 'bill_type_name',
    color: ({ bill_type_name }) => {
      return bill_type_name == '支出' ? '#FAAD14' : '#5B8FF9';
    },
    meta: {
      category_name: {
        alias: '类别'
      },
      fee: {
        alias: '金额'
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <RangePicker
          locale={locale}
          defaultValue={[dayjs('2023-01-01', 'YYYY-MM-DD'), dayjs('2023-12-31', 'YYYY-MM-DD')]}
          onChange={(timeList: any, timeString: any) => {
            let tmpBegin = timeList[0].toDate();
            let tmpEnd = timeList[1].toDate();
            setSelectTime({ begin_time: tmpBegin, end_time: tmpEnd });
            console.log(selectTime);
          }}
        />
      </div>
      <Bar {...config} />;
    </div>
  );
};

const Analysis = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectTime, setSelectTime] = useState({ year: 2023, month: 4 });

  useEffect(() => {
    let reqBody1 = {
      year: selectTime.year,
      month: selectTime.month,
      is_analysis: true,
      bill_type: 1
    };
    let reqBody2 = {
      year: selectTime.year,
      month: selectTime.month,
      is_analysis: true,
      bill_type: 2
    };
    let ret1 = request('post', 'bill/statistic', reqBody1);
    let ret2 = request('post', 'bill/statistic', reqBody2);
    ret1.then((tmp1) => {
      let tmpList = [];

      tmp1.map((item: any) => {
        item.fee = Math.floor(item.fee) / 100;
        tmpList.push(item);
        if (item.month == selectTime.month) {
          item.month_name = '本月';
        } else {
          item.month_name = '上月';
        }
      });
      console.log(tmpList);
      setData1(tmpList);
    });
    ret2.then((tmp2) => {
      let tmpList = [];
      tmp2.map((item: any) => {
        item.fee = Math.floor(item.fee) / 100;
        tmpList.push(item);
        if (item.month == selectTime.month) {
          item.month_name = '本月';
        } else {
          item.month_name = '上月';
        }
      });
      console.log(tmpList);
      setData2(tmpList);
    });
  }, [selectTime]);
  const config1 = {
    data: data1,
    isGroup: true,
    xField: 'category_name',
    yField: 'fee',
    seriesField: 'month_name',

    /** 设置颜色 */
    //color: ['#1ca9e6', '#f88c24'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position'
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap'
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color'
        }
      ]
    }
  };

  const config2 = {
    data: data2,
    isGroup: true,
    xField: 'category_name',
    yField: 'fee',
    seriesField: 'month_name',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position'
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap'
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color'
        }
      ]
    }
  };

  return (
    <Row gutter={10}>
      <Col span={24}>
        <DatePicker
          locale={locale}
          onChange={(value) => {
            setSelectTime({ year: value.year(), month: value.month() });
          }}
          picker="month"
          defaultValue={dayjs('2023-05', 'YYYY-MM')}
          style={{ marginBottom: 8 }}
        />
      </Col>

      <Col span={11}>
        <center>支出对比</center>
        <Column {...config1} style={{ marginTop: 5 }} />
      </Col>

      <Col span={11} push={2}>
        <center>收入对比</center>
        <Column {...config2} style={{ marginTop: 5 }} />
      </Col>
    </Row>
  );
};

export default function Statistic() {
  const [mode, setMode] = useState('statistic');
  const items: any = [
    {
      key: '1',
      label: `年度统计`,
      children: <Year />
    },
    {
      key: '2',
      label: `月度统计`,
      children: <Month />
    },
    {
      key: '3',
      label: `时间统计`,
      children: <ByTime />
    }
  ];
  return (
    <div style={{ width: '80%', maxWidth: 800, margin: '0 auto' }}>
      <Radio.Group
        value={mode}
        style={{ marginBottom: 10 }}
        onChange={(e) => {
          setMode(e.target.value);
        }}
      >
        <Radio.Button value="statistic">财务统计</Radio.Button>
        <Radio.Button value="analysis">财务分析</Radio.Button>
      </Radio.Group>

      {mode == 'statistic' && <Tabs items={items} tabPosition={'left'} onChange={() => {}} />}
      {mode == 'analysis' && <Analysis />}
    </div>
  );
}
