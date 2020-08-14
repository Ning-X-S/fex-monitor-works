import { Layout, Menu, Typography, Select } from 'antd';
import React, { Props, useState, useEffect } from 'react';
import { GlobalModelState, ConnectProps, Link, ConnectRC, connect } from 'umi';
import './index.less';
import { MailOutlined } from '@ant-design/icons';
import HeaderContent from './header';

// 包含结构，暂时 Nav 组件就不分离了
//import Nav from '../../../components/nav/index';

const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;

interface PageProps extends ConnectProps {
  products: GlobalModelState;
}

interface AddFunc {
  (number: number): void;
}

const IndexPage: ConnectRC<PageProps> = ({ products, children, dispatch }) => {
  const { list } = products;
  const [collapsed, setCollapsed] = useState(true);
  const siderWidth = 200;
  const toggleCollapsed = () => {
    setCollapsed(collapsed => !collapsed);
  };
  const handleAdd: AddFunc = number => {
    dispatch({
      type: 'products/add',
      payload: number,
    });
  };
  useEffect(() => {
    handleAdd(1);
    handleAdd(2);
    console.log(111);
  }, []);
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        className="ant-pro-sider-fixed"
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="9" icon={<MailOutlined />}>
            <Link to="/error/list">Error</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      {
        <div
          className="placeholder"
          style={{
            width: collapsed ? 80 : siderWidth,
            overflow: 'hidden',
            flex: `0 0 ${collapsed ? 80 : siderWidth}px`,
            maxWidth: collapsed ? 80 : siderWidth,
            minWidth: collapsed ? 80 : siderWidth,
          }}
        />
      }
      <Layout className="site-layout">
        <Header className="site-layout-background header">
          <HeaderContent />
        </Header>
        <Content className="site-layout-background content">
          list:{JSON.stringify(list)}
          <div>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Jarvis Works ©2020 Created by HIGO FEX
        </Footer>
      </Layout>
    </Layout>
  );
};

export default connect(({ products }: { products: GlobalModelState }) => ({
  products,
}))(IndexPage);
