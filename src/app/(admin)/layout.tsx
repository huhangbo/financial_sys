'use client';
import React, {useState} from "react";
import {ProConfigProvider, ProLayout, ProSettings} from "@ant-design/pro-components";
import {usePathname, useRouter} from "next/navigation";
import {LogoutOutlined, MoneyCollectFilled, NotificationFilled, ProjectFilled} from "@ant-design/icons";
import {Dropdown} from "antd";

const Component = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true
  });
  const pathname = usePathname();
  const { push, replace } = useRouter();

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
        path: '/userAdmin',
        name: '用户管理',
        icon: <MoneyCollectFilled />,
      },
      {
        path: '/category',
        name: '分类管理',
        icon: <ProjectFilled />,
      },
      {
        path: '/newsAdmin',
        name: '新闻管理',
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
      title: '七妮妮',
      render: (props, dom) => {
      return (
        <>
      <Dropdown
      menu={{
        items: [
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
