import React, { useState } from 'react';
import './index.less';
import { Link } from 'umi';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default () => {
  const [fileList, setFileList] = useState([]);
  const props = {
    name: 'file',
    action: '/api/upload',
    showUploadList: false,
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(info.file, info.fileList);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      setFileList(info.fileList);
    },
  };
  return (
    <div style={{ padding: 10 }}>
      <Link to="/test">
        <h1 className="index">Page index</h1>
      </Link>
      <Upload style={{ marginTop: 10 }} {...props} fileList={fileList}>
        <Button>
          <UploadOutlined /> Upload
        </Button>
      </Upload>
    </div>
  );
};
