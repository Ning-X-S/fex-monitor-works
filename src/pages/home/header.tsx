import React, { Props, useState } from 'react';
import { Button, Divider, Select } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Option } = Select;

export default (props: any) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <Button type="text" icon={<HomeOutlined />} />
        <Divider type="vertical" />
        <Select defaultValue="lucy" style={{ width: 120 }}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>
      <div className="flex-0">
        <Button type="primary">新建</Button>
      </div>
    </div>
  );
};
