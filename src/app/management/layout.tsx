'use client';
import Icon from '@ant-design/icons';
import { Layout, MenuProps } from 'antd';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

const { Content, Sider } = Layout;

export default function Layout_management({ params, children }: { params: any; children: React.ReactNode }) {
  const currPath = useSelectedLayoutSegment();
  const { replace } = useRouter();
  const items: MenuProps['items'] = [
    {
      key: `detail`,
      icon: <Icon type="" />,
      label: `收支明细`,
      onClick: () => {
        replace('/management/detail');
      }
    },
    {
      key: `income`,
      icon: <Icon />,
      label: `收入记账`,
      onClick: () => replace('/management/income')
    },
    {
      key: `expend`,
      icon: <Icon />,
      label: `支出记账`,
      onClick: () => replace('/management/expend')
    }
  ];
  return (
    <Layout>
      {/* <Sider width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['detail']}
          selectable={true}
          selectedKeys={[currPath ?? 'detail']}
          style={{ height: '100%', borderRight: 0 }}
          items={items}
        />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        > */}
      {children}
      {/* </Content>
      </Layout> */}
    </Layout>
  );
}
