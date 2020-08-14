import React, { useState } from 'react';
import './index.less';
import { Menu } from 'antd';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
import { List } from 'antd';

const { Title } = Typography;
const { SubMenu } = Menu;

export default () => {
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={4}>
        <Menu
          style={{ width: '100%' }}
          defaultSelectedKeys={['mail']}
          defaultOpenKeys={['mail']}
          mode="inline"
        >
          <Menu.Item key="mail">总览</Menu.Item>
          <Menu.Item key="mail2">Navigation One</Menu.Item>
          <Menu.Item key="mail3">Navigation One</Menu.Item>
        </Menu>
      </Col>
      <Col span={14}>
        <Title level={2}>New this week</Title>
        <List
          size="small"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Col>
      <Col span={6}>col-8</Col>
    </Row>
  );
};
