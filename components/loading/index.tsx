import React from 'react';
import { Spin } from 'antd';
import './index.less';

function Loading(props: any) {
  return (
    <div className="loading-box">
      <Spin size={props.size} />
    </div>
  );
}

export default Loading;
