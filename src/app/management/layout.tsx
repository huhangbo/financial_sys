'use client';
import Icon, { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps } from 'antd';
import React from 'react';

const { Header, Content, Sider } = Layout;

export default function layout({ children }: { children: React.ReactNode }) {
  const items: MenuProps['items'] = [
    {
      key: `sub ${Math.random()}`,
      icon: <Icon />,
      label: `subnav`,
      onClick: () => {}
    },
    {
      key: `sub ${Math.random()}`,
      icon: <Icon />,
      label: `subnav`,
      onClick: () => {}
    },
    {
      key: `sub ${Math.random()}`,
      icon: <Icon />,
      label: `subnav`,
      onClick: () => {}
    }
  ];
  return (
    <Layout>
      <Sider width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['0']}
          defaultOpenKeys={['sub1']}
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
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
