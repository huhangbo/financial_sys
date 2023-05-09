'use client';
import {
  CalculatorFilled,
  EditFilled,
  LogoutOutlined,
  MoneyCollectFilled,
  NotificationFilled,
  PayCircleFilled,
  ProjectFilled,
  SignalFilled,
  UserOutlined
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { ProConfigProvider, ProLayout } from '@ant-design/pro-components';
// @ts-expect-error too old to have types
import Calculator from '@pie-framework/material-ui-calculator';
import { Button, Divider, Dropdown, Input, Popover, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {useCookieEntry} from "@/utils/cookie";


const Component = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true
  });
  const pathname = usePathname();
  const { push, replace } = useRouter();
  const [user, setUser] = useCookieEntry('user', {})

  // calculator
  const [clicked, setClicked] = useState(false);

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      <ProConfigProvider hashed={false}>
        <ProLayout
          title="财务管理系统"
          logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
          prefixCls="my-prefix"
          bgLayoutImgList={[
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              left: 85,
              bottom: 100,
              height: '303px'
            },
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              bottom: -68,
              right: -45,
              height: '303px'
            },
            {
              src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
              bottom: 0,
              left: 0,
              width: '331px'
            }
          ]}
          route={{
            path: '/',
            routes: [
              {
                path: '/management',
                name: '财务管理',
                icon: <MoneyCollectFilled />,
              },
              {
                path: '/statistic',
                name: '财务统计',
                icon: <ProjectFilled />,
                // routes: [
                  // {
                  //   path: '/statistic/year',
                  //   name: '年度统计',
                  //   icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg'
                  // },
                  // {
                  //   path: '/statistic/month',
                  //   name: '月度统计',
                  //   icon: <SignalFilled />
                  // }
                // ]
              },
              {
                path: '/budget',
                name: '财务预算',
                icon: <PayCircleFilled />
              },
              {
                path: '/note',
                name: '备忘录',
                icon: <EditFilled />
              },
              {
                path: '/news',
                name: '新闻',
                icon: <NotificationFilled />
              }
            ]
          }}
          location={{
            pathname
          }}
          siderMenuType="group"
          menu={{
            collapsedShowGroupTitle: true
          }}
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: user.username,
            render: (props, dom) => {
              return (
                <>
                  <Popover
                    trigger="click"
                    open={clicked}
                    onOpenChange={(v) => setClicked(v)}
                    content={<Calculator mode="basic" />}
                  >
                    {document.body.clientWidth > 768 ? (
                      <>
                        <Button>
                          <CalculatorFilled />
                          <span>计算器</span>
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </Popover>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'userinfo',
                          icon: <UserOutlined />,
                          label: '个人信息',
                          onClick: () => push('/user')
                        },
                        {
                          key: 'logout',
                          icon: <LogoutOutlined />,
                          label: '退出登录',
                          onClick: () => replace('/login')
                        }
                      ]
                    }}
                  >
                    {dom}
                  </Dropdown>
                </>
              );
            }
          }}

          headerTitleRender={(logo, title, _) => {
            const defaultDom = (
              <a>
                {logo}
                {title}
              </a>
            );
            if (document.body.clientWidth < 1400) {
              return defaultDom;
            }
            if (_.isMobile) return defaultDom;
            return <>{defaultDom}</>;
          }}
          onMenuHeaderClick={(e) => console.log(e)}
          menuItemRender={(item, dom) => {
            return (
              <div
                onClick={() => {
                  push(item.path || '/management');
                }}
              >
                {dom}
              </div>
            );
          }}
          {...settings}
        >
          {children}
        </ProLayout>
      </ProConfigProvider>
    </div>
  );
};
export default Component;
