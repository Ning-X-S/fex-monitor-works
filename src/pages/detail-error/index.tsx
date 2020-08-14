import React, { useState, useEffect, useCallback, Props } from 'react';
import './index.less';
import { Button, message, Spin } from 'antd';
import { Link } from 'umi';
import request from 'umi-request';
import { HomeOutlined, SyncOutlined } from '@ant-design/icons';
import { publicState, PublicStateParam } from '../../utils/state';
import ErrorStack from './components/stack';
import ErrorPercent from './components/percent';
import { basisDataInter, recordSync, recordDetail } from '../../api/record';

interface MyProps extends Object {
  match: {
    params: {
      name: string;
    };
  };
  location: {
    query: {
      id: string;
    };
  };
}

export default (props: MyProps) => {
  if (!props.match.params.name) {
    message.error('props.match.name error');
    return false;
  }
  if (!props.location.query.id) {
    message.error('props.match.id error');
    return false;
  }

  const publicParams: PublicStateParam = {
    id: props.location.query.id,
    pid: props.match.params.name,
    loading: false,
  };
  const { id, pid, loading, setLoading } = publicState(publicParams);
  const [data, setData] = useState<basisDataInter>({
    error_code: -1,
    content: '',
    data: {},
    message: '',
  });
  const getLogDetail = useCallback(async () => {
    try {
      setLoading(true);
      let data: basisDataInter = await recordDetail({ pid, id });
      if (data.error_code === 0) {
        data = { ...data, ...data.data };
        message.success('Loading success');
      } else if (data.error_code === 4000501) {
        message.error(data.message || '信息暂未同步，请稍后重试');
      }
      setData(data);
      setLoading(false);
    } catch (err) {
      message.error('Loading fail');
      setLoading(false);
    }
  }, [id, pid]);

  useEffect(() => {
    getLogDetail();
  }, [getLogDetail]);

  async function syncData() {
    setLoading(true);
    let res: basisDataInter = await recordSync();
    if (res.error_code === 0) {
      message.success('数据同步成功');
      setLoading(false);
      window.location.reload();
    } else {
      setLoading(false);
      message.error(res.message || '数据同步失败，请稍后重试');
    }
  }

  return (
    <div className="detail-error">
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Link to="/index">
          <HomeOutlined
            style={{
              fontSize: 28,
              marginRight: 10,
              color: 'rgba(0, 0, 0, 0.65)',
            }}
          />
        </Link>
        <div className="pid-name">{pid}</div>
      </div>
      <Spin size="large" tip="Loading..." spinning={loading}>
        {data.error_code === 0 ? (
          <div className="detail-main">
            <ErrorStack info={data.content} />
            <ErrorPercent />
          </div>
        ) : (
          <div className="refresh">
            <div className="no-info">{data.message || '加载中'}</div>
            {data.message ? (
              <div style={{ marginTop: 10 }}>
                <Button
                  className="refresh-btn"
                  onClick={syncData}
                  type="primary"
                  icon={<SyncOutlined />}
                >
                  立即刷新
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </Spin>
    </div>
  );
};
