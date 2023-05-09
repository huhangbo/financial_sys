// @ts-nocheck
'use client';

import {Tabs, Radio, DatePicker} from "antd";
import React, {useState, useEffect} from "react";
import {Line, Column, Bar} from '@ant-design/plots';
import {request} from "@/utils/request";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import locale from "antd/es/date-picker/locale/zh_CN";


const { RangePicker } = DatePicker;
const Year = () => {
  const [data, setData] = useState([]);
  const [selectTime, setSelectTime] = useState({'year': 2023})

  useEffect(() => {
    let ret = request('post', 'bill/statistic', selectTime)
    ret.then(data => {
      let tmpList = []
      data.map((item:any) => {
        item.fee = Math.floor(item.fee)/100
        item.month = String(item.month.toString())
        tmpList.push(item)
      })
      console.log(tmpList)
      setData(tmpList)
    })
  }, [selectTime])

  const config = {
    data,
    isGroup: true,
    xField: 'month',
    yField: 'fee',
    seriesField: 'bill_type_name',
  };

  return (
    <div>
      <div style={{marginBottom: 6}}>
        <DatePicker locale={locale} onChange={(value) => {
          setSelectTime({'year': value.year()})
        }} picker="year" defaultValue={dayjs('2023', 'YYYY')} />
      </div>
      <Column {...config} />
    </div>
  )
}

const Month = () => {
  const [data, setData] = useState([]);
  const [selectTime, setSelectTime] = useState({'year': 2023, 'month': 4})

  useEffect(() => {
    let ret = request('post', 'bill/statistic', selectTime)
    ret.then(data => {
      let tmpList = []
      data.map((item:any) => {
        item.fee = Math.floor(item.fee)/100
        item.day = item.day.toString()
        tmpList.push(item)
      })
      console.log(tmpList)
      setData(tmpList)
    })
  }, [selectTime])

  const config = {
    data,
    isGroup: true,
    xField: 'day',
    yField: 'fee',
    seriesField: 'bill_type_name',
  }

  return (
    <div>
      <div style={{marginBottom: 6}}>
        <DatePicker  locale={locale} onChange={(value) => {
          setSelectTime({'year': value.year(), 'month': value.month()})
        }} picker="month" defaultValue={dayjs('2023-05', 'YYYY-MM')} />
      </div>
      <Line {...config} />
    </div>
  )
}


const ByTime = () => {
  const [data, setData] = useState([]);
  const [selectTime, setSelectTime] = useState({})

  useEffect(() => {
    let ret = request('post', 'bill/statistic', selectTime)
    ret.then(data => {
      let tmpList = []
      data.map((item:any) => {
        item.fee = Math.floor(item.fee)/100
        tmpList.push(item)
      })
      console.log(tmpList)
      setData(tmpList)
    })
  }, [selectTime])

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
        alias: '类别',
      },
      fee: {
        alias: '金额',
      },
    },
  };

  return (
    <div>
      <div style={{marginBottom: 10}}>
        <RangePicker locale={locale}
          defaultValue={[dayjs('2023-01-01', 'YYYY-MM-DD'), dayjs('2023-12-31', 'YYYY-MM-DD')]}
          onChange={(timeList:any, timeString:any) => {
            let tmpBegin = timeList[0].toDate()
            let tmpEnd = timeList[1].toDate()
            setSelectTime({'begin_time': tmpBegin, 'end_time': tmpEnd})
            console.log(selectTime)
          }}
        />
      </div>
      <Bar {...config} />;
    </div>
  )
}

const Analysis = () => {

}

export default function Statistic() {
  const [mode, setMode] = useState("statistic");
  const items: any = [
    {
      key: '1',
      label: `年度统计`,
      children: <Year/>,
    },
    {
      key: '2',
      label: `月度统计`,
      children: <Month/>,
    },
    {
      key: '3',
      label: `时间统计`,
      children: <ByTime/>,
    },
  ];
  return (
    <div style={{width: '80%', maxWidth: 800, margin: '0 auto'}}>
        <Radio.Group value={mode} style={{ marginBottom: 10 }}
          onChange={(e) => {
          setMode(e.target.value);
        }} >
          <Radio.Button value="statistic">财务统计</Radio.Button>
          <Radio.Button value="analysis">财务分析</Radio.Button>
        </Radio.Group>

      {mode == "statistic"&& <Tabs items={items} tabPosition={'left'} onChange={()=>{}}  />}
      {mode == "analysis" && <Analysis/>}
    </div>
    )
}
