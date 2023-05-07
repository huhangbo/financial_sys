// @ts-nocheck
'use client';
import { ProList } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import React, {useEffect, useState} from 'react';
import {request} from "@/utils/request";

export default function News (){
  const [list, setList] = useState<any[]>([]);
    useEffect( () => {
      let res = request("get", "news/list")
      res.then( data => {
        console.log(data)
        setList(data.news_list);
      })
    }, []);

  return (
      <ProList<{any}>

          itemLayout="vertical"
          rowKey="news_id"
          headerTitle="新闻列表"
          dataSource={list}
          metas={{
            title: {
              dataIndex: 'title',
            },

            subTitle: {
              dataIndex: 'source'
            },
            content: {
              dataIndex: 'detail',
            },

            actions: {
              render: () => [],
            },
            extra: {
              render: () => (
                  <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
              ),
            },
          }}
      />
  );
}
