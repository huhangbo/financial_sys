'use client';

import {
  CaretDownFilled,
  ChromeFilled,
  CrownFilled,
  DoubleRightOutlined,
  LogoutOutlined,
  PlusCircleFilled,
  SearchOutlined,
  SmileFilled,
  TabletFilled
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import { css } from '@emotion/css';
import { Divider, Dropdown, Input, Popover, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Item: React.FC<{ children: React.ReactNode }> = (props) => {
  const { token } = theme.useToken();
  return (
    <div
      className={css`
        color: ${token.colorTextSecondary};
        font-size: 14px;
        cursor: pointer;
        line-height: 22px;
        margin-bottom: 8px;
        &:hover {
          color: ${token.colorPrimary};
        }
      `}
      style={{
        width: '33.33%'
      }}
    >
      {props.children}
      <DoubleRightOutlined
        style={{
          marginInlineStart: 4
        }}
      />
    </div>
  );
};

const List: React.FC<{ title: string; style?: React.CSSProperties }> = (props) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        width: '100%',
        ...props.style
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: token.colorTextHeading,
          lineHeight: '24px',
          fontWeight: 500,
          marginBlockEnd: 16
        }}
      >
        {props.title}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {new Array(6).fill(1).map((_, index) => {
          return <Item key={index}>具体的解决方案-{index}</Item>;
        })}
      </div>
    </div>
  );
};

const MenuCard = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Divider
        style={{
          height: '1.5em'
        }}
        type="vertical"
      />
      <Popover
        placement="bottom"
        overlayStyle={{
          width: 'calc(100vw - 24px)',
          padding: '24px',
          paddingTop: 8,
          height: '307px',
          borderRadius: '0 0 6px 6px'
        }}
        content={
          <div style={{ display: 'flex', padding: '32px 40px' }}>
            <div style={{ flex: 1 }}>
              <List title="金融解决方案" />
              <List
                title="其他解决方案"
                style={{
                  marginBlockStart: 32
                }}
              />
            </div>

            <div
              style={{
                width: '308px',
                borderInlineStart: '1px solid ' + token.colorBorder,
                paddingInlineStart: 16
              }}
            >
              <div
                className={css`
                  font-size: 14px;
                  color: ${token.colorText};
                  line-height: 22px;
                `}
              >
                热门产品
              </div>
              {new Array(3).fill(1).map((name, index) => {
                return (
                  <div
                    key={index}
                    className={css`
                      border-radius: 4px;
                      padding: 16px;
                      margin-top: 4px;
                      display: flex;
                      cursor: pointer;
                      &:hover {
                        background-color: ${token.colorBgTextHover};
                      }
                    `}
                  >
                    <img src="https://gw.alipayobjects.com/zos/antfincdn/6FTGmLLmN/bianzu%25252013.svg" />
                    <div
                      style={{
                        marginInlineStart: 14
                      }}
                    >
                      <div
                        className={css`
                          font-size: 14px;
                          color: ${token.colorText};
                          line-height: 22px;
                        `}
                      >
                        Ant Design
                      </div>
                      <div
                        className={css`
                          font-size: 12px;
                          color: ${token.colorTextSecondary};
                          line-height: 20px;
                        `}
                      >
                        杭州市较知名的 UI 设计语言
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        }
      >
        <div
          style={{
            color: token.colorTextHeading,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            gap: 4,
            paddingInlineStart: 8,
            paddingInlineEnd: 12,
            alignItems: 'center'
          }}
          className={css`
            &:hover {
              background-color: ${token.colorBgTextHover};
            }
          `}
        >
          <span> 企业级资产中心</span>
          <CaretDownFilled />
        </div>
      </Popover>
    </div>
  );
};

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid
            }}
          />
        }
        placeholder="搜索方案"
        bordered={false}
      />
      <PlusCircleFilled
        style={{
          color: token.colorPrimary,
          fontSize: 24
        }}
      />
    </div>
  );
};

const Component = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true
  });
  const pathname = usePathname();
  const { push } = useRouter();
  const [num, setNum] = useState(40);
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      <ProConfigProvider hashed={false}>
        <ProLayout
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
                icon: <SmileFilled />,
                routes: [
                  {
                    path: '/management/detail',
                    name: '收入明细',
                    icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg'
                  },
                  {
                    path: '/management/expend',
                    name: '收入记账',
                    icon: <CrownFilled />
                  },
                  {
                    path: '/management/income',
                    name: '支出记账',
                    icon: <CrownFilled />
                  }
                ]
              },
              {
                path: '/statistic',
                name: '财务统计',
                icon: <CrownFilled />,
                access: 'canAdmin',
                routes: [
                  {
                    path: '/admin/sub-page1',
                    name: '一级页面',
                    icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg'
                  },
                  {
                    path: '/admin/sub-page2',
                    name: '二级页面',
                    icon: <CrownFilled />
                  },
                  {
                    path: '/admin/sub-page3',
                    name: '三级页面',
                    icon: <CrownFilled />
                  }
                ]
              },
              {
                name: '财务分析',
                icon: <TabletFilled />,
                path: '/analysis',
                routes: [
                  {
                    path: '/list/sub-page',
                    name: '列表页面',
                    icon: <CrownFilled />,
                    routes: [
                      {
                        path: 'sub-sub-page1',
                        name: '一一级列表页面',
                        icon: <CrownFilled />,
                        component: './Welcome'
                      },
                      {
                        path: 'sub-sub-page2',
                        name: '一二级列表页面',
                        icon: <CrownFilled />,
                        component: './Welcome'
                      },
                      {
                        path: 'sub-sub-page3',
                        name: '一三级列表页面',
                        icon: <CrownFilled />,
                        component: './Welcome'
                      }
                    ]
                  },
                  {
                    path: '/list/sub-page2',
                    name: '二级列表页面',
                    icon: <CrownFilled />,
                    component: './Welcome'
                  },
                  {
                    path: '/list/sub-page3',
                    name: '三级列表页面',
                    icon: <CrownFilled />,
                    component: './Welcome'
                  }
                ]
              },
              {
                path: 'https://ant.design',
                name: 'Ant Design 官网外链',
                icon: <ChromeFilled />
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
            title: '七妮妮',
            render: (props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: '退出登录'
                      }
                    ]
                  }}
                >
                  {dom}
                </Dropdown>
              );
            }
          }}
          // actionsRender={(props) => {
          //   if (props.isMobile) return [];
          //   return [
          //     props.layout !== 'side' && document.body.clientWidth > 1400 ? <SearchInput /> : undefined,
          //     <InfoCircleFilled key="InfoCircleFilled" />,
          //     <QuestionCircleFilled key="QuestionCircleFilled" />,
          //     <GithubFilled key="GithubFilled" />
          //   ];
          // }}
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
            return (
              <>
                {defaultDom}
                {/* <MenuCard /> */}
              </>
            );
          }}
          onMenuHeaderClick={(e) => console.log(e)}
          menuItemRender={(item, dom) => {
            console.log(item);
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
