'use client';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

const { Header } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`
}));

const App = ({ children }: { children: React.ReactNode }) => {
  const currentSelected = useSelectedLayoutSegment();
  const { replace } = useRouter();
  const list: MenuProps['items'] = [
    {
      key: 'management',
      label: '财务管理',
      onClick: () => {
        if (currentSelected !== 'management') replace('management');
      }
    },
    {
      key: 'statistic',
      label: '财务统计',
      onClick: () => {
        if (currentSelected !== 'statistic') replace('statistic');
      }
    },
    {
      key: 'analysis',
      label: '财务分析',
      onClick: () => {
        if (currentSelected !== 'analysis') replace('analysis');
      }
    }
  ];

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['management']}
          selectedKeys={[currentSelected ?? 'management']}
          items={list}
        />
      </Header>
      {children}
    </Layout>
  );
};

export default App;
