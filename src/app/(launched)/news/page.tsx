// @ts-nocheck
'use client';
import { ProList } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from '@/utils/request';

export default function News() {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    let res = request('get', 'news/list');
    res.then((data) => {
      console.log(data);
      setList(data.news_list);
    });
  }, []);
  let srcMap = {};
  srcMap['东方财经'] = 'https://dfscdn.dfcfw.com/download/D24767355454404270235_w280h170.jpg';
  srcMap['东方财富'] = 'https://dfscdn.dfcfw.com/download/D24767355454404270235_w280h170.jpg';
  srcMap['第一财经'] = 'https://imgcdn.yicai.com/uppics/images/2023/05/5712f74bf8d82463734dca0cb1523df4.jpg';
  srcMap['凤凰网财经'] =
    'https://x0.ifengimg.com/ucms/2023_18/B8CAF92C0A2F0F45C52AF31A573330D7F6E079CB_size116_w1920_h282.jpg';
  srcMap['新浪财经'] =
    'https://n.sinaimg.cn/finance/transform/562/w360h202/20230513/7667-3951803357e3b7a5dcd66cf646f97fcb.jpg';
  return (
    <ProList<{ any }>
      itemLayout="vertical"
      rowKey="news_id"
      headerTitle="新闻列表"
      dataSource={list}
      metas={{
        title: {
          dataIndex: 'title'
        },

        subTitle: {
          dataIndex: 'source'
        },
        content: {
          dataIndex: 'detail'
        },

        actions: {
          render: () => []
        },
        extra: {
          render: (_: any, record: any) => <img width={272} alt="logo" src={srcMap[record.source]} />
        }
      }}
    />
  );
}
