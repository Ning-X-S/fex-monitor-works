import React, { Key, useState, useEffect, useCallback } from 'react';
import './index.less';
import {
  Table,
  Button,
  message,
  Pagination,
  Select,
  Spin,
  List,
  Typography,
} from 'antd';
import {
  HomeOutlined,
  DownCircleOutlined,
  FieldTimeOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Link } from 'umi';
import { getDateDiff } from '@/utils/util';
import { Column } from '@ant-design/charts';
import { publicState, PublicStateParam } from '@/utils/state';
import { basisDataInter, searchError, markCreate } from '@/api/record';

const { Option } = Select;

// 用的React.Key,要么自己写，要么引入React.Key类型直接赋值
// const selectedRowKeysArr: Array<string | number> = []
const selectedRowKeysArr: Array<Key> = [];

function onSearch(val: string) {
  console.log('search:', val);
}

// map基础数据
const mapConfig: any = {
  title: {
    visible: false,
  },
  description: {
    visible: false,
  },
  // forceFit: true,
  width: 240,
  height: 100,
  data: [],
  padding: 'auto',
  xField: 'time',
  yField: 'events',
  xAxis: {
    visible: true,
    label: {
      visible: false,
    },
    line: {
      style: {
        stroke: '#1890ff',
        // 设置为虚线
        lineDash: [4, 2],
        lineWidth: 2,
      },
    },
    title: {
      visible: false,
    },
  },
  yAxis: {
    visible: false,
  },
  // 分割线
  // guideLine: [
  //   {
  //     type: 'min', // 'max' | 'min' | 'median' |  'mean'
  //     lineStyle: {
  //       stroke: '#1890ff',
  //       lineDash: [4, 2],
  //     },
  //     text: {
  //       visible: false,
  //       position: 'center',
  //       content: '',
  //       style: {
  //         fill: '#f55',
  //         fontSize: 10
  //       }
  //     }
  //   },
  // ],
  // 是否展示数值
  label: {
    visible: false,
    style: {
      fill: '#0D0E68',
      fontSize: 14,
      fontWeight: 600,
      opacity: 0.6,
    },
  },
};

const operateList: Array<string> = ['Resolve', 'Delete'];

interface PageInfoInter extends Object {
  p: number;
  size: number;
}
interface MyProps extends Object {
  match: {
    params: {
      name: string;
    };
  };
  location: {
    query: {
      pid: string;
    };
  };
}

// 临时变量定义在react外，内部修改得用hooks
let selectRows: Array<object> = [];

export default (props: MyProps) => {
  const pidArr: string[] = [
    'biz-works',
    'higo-im',
    'gls',
    'm',
    'xiaozhuo',
    'xz-works',
  ];

  const publicParams: PublicStateParam = {
    pid: props.location.query.pid || pidArr[0],
  };
  const { pid, setPid, loading, setLoading } = publicState(publicParams);
  const [hasSelected, setHasSelected] = useState(true);
  const [errorList, setErrorList] = useState([]);
  const [pageInfo, setPageInfo] = useState<PageInfoInter>({ p: 1, size: 10 });
  const [total, setTotal] = useState(0);
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [isShowOprate, setIsShowOprate] = useState(false);

  // 提前定义使用selectedRowKeysArr或者下面那种写法
  // const [selectedRowKeys, setSelectedRowKeys] = useState(selectedRowKeysArr)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[] | []>([]);

  const columns = [
    {
      title: 'REASON',
      dataIndex: 'key',
      width: 420,
      key: 'message',
      ellipsis: {
        showTitle: false,
      },
      render: (text: string, scope: any) => {
        const textArr: Array<any> = text.split('$*$');
        const recent_content: any = scope.recent_items.hits.hits[0]._source;
        const farthest_content: any = scope.farthest_items.hits.hits[0]._source;
        const _id = scope.recent_items.hits.hits[0]._id;
        return (
          <div>
            <div
              style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}
            >
              <Button size="small" type="primary" danger>
                {`${recent_content.content._kind.replace(/^\S/, (s: string) =>
                  s.toUpperCase(),
                )} ${recent_content.content._type.split(' ')[0]}`}
              </Button>
              <a
                href={textArr[1]}
                target="_blank"
                style={{
                  display: 'block',
                  marginLeft: 6,
                  whiteSpace: 'normal',
                  overflow: 'auto',
                }}
              >
                {textArr[1]}
              </a>
            </div>
            <Link to={`/error/detail/${pid}?id=${_id}`}>
              <div style={{ whiteSpace: 'normal' }}>{textArr[0]}</div>
            </Link>

            {/* <Tooltip style={{whiteSpace: "normal"}} placement="topLeft" title={textArr[0]}>
              {textArr[0]}
            </Tooltip> */}
            <div>
              <FieldTimeOutlined style={{ marginRight: 10 }} />
              <span style={{ fontSize: 12 }}>
                {getDateDiff(recent_content.dateTime)} -{' '}
                {getDateDiff(farthest_content.dateTime)} old
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'EVENTS',
      key: 'events',
      width: 100,
      dataIndex: 'doc_count',
    },
    {
      title: 'MAP',
      key: 'map',
      width: 240,
      render: (text: string, scope: any) => {
        return <Column {...{ ...mapConfig, ...{ data: scope.data } }} />;
      },
    },
    // {
    //   title: 'Address',
    //   key: 'address',
    //   render: (text: string, scope: any) => (
    //     <Tooltip placement="topLeft" title={scope.recent_items.hits.hits[0]._source.localIP}>
    //       {scope.recent_items.hits.hits[0]._source.localIP}
    //     </Tooltip>
    //   ),
    // },
    {
      title: 'USERS',
      key: 'users',
      width: 100,
      dataIndex: 'users',
    },
  ];

  const onSelectChange = (selectedRowKeys: Array<Key>, selectedRows: any) => {
    const selectRow: Array<object> = selectedRows.map((item: any) => {
      return {
        es_id: item.recent_items.hits.hits[0]._id,
        error_content: `${item.recent_items.hits.hits[0]._source.content.message}$*$${item.recent_items.hits.hits[0]._source.content.filename}`,
      };
    });
    console.log('selectedRowKeys changed: ', selectRow);
    setSelectedRowKeys(selectedRowKeys);
    selectRows = selectRow;
  };

  const start = () => {
    console.log(selectedRowKeys);
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys(list => []);
      setLoading(false);
    }, 1000);
  };

  const getListData = useCallback(async () => {
    try {
      setLoading(true);
      const res: basisDataInter = await searchError({
        pid,
        ...pageInfo,
      });
      if (res.error_code === 0) {
        setErrorList(list => res.data.list);
        setTotal(num => res.data.total);
        message.success('Loading success');
      } else {
        message.error('This is an error message');
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error('Loading fail');
    }
  }, [pageInfo, pid]);

  useEffect(() => {
    getListData();
  }, [getListData]);

  const onChangePage = (p: number) => {
    setPageInfo({ p, size: pageInfo.size });
  };
  const onShowSizeChange = (p: number, size: number) => {
    setPageInfo({ p: 1, size: size });
  };

  const childrenArr: any = [];
  pidArr.forEach(item => {
    childrenArr.push(
      <Option value={item} key={item}>
        {item}
      </Option>,
    );
  });

  function onChangePid(value: string) {
    setPid(value);
    setPageInfo({ p: 1, size: pageInfo.size });
    setIsShowSelect(!isShowSelect);
  }

  async function operateItem(type: string): Promise<any> {
    try {
      setLoading(true);
      if (!selectedRowKeys.length) {
        message.error('Please selected table item');
        return false;
      }
      const list: object[] = selectRows.map((item: object) => {
        return {
          status: type === 'Resolve' ? 1 : -1,
          ...item,
        };
      });
      let res: basisDataInter = await markCreate({ list: list });
      if (res.error_code === 0) {
        message.success(
          type === 'Resolve' ? '标记问题已解决' : '标记问题已删除',
        );
        setLoading(false);
        window.location.reload();
      } else {
        setLoading(false);
        message.error(res.message || '标记失败，请稍后重试');
      }
    } catch (err) {
      setLoading(false);
      message.error(err.message || '标记失败，请稍后重试');
    }
  }
  return (
    <div
      className="content-box"
      onClick={() => {
        setIsShowSelect(false);
      }}
    >
      <Spin size="large" tip="Loading..." spinning={loading}>
        <div
          style={{
            paddingBottom: 16,
            paddingTop: 10,
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            position: 'sticky',
            top: 0,
            right: 0,
            zIndex: 9,
          }}
        >
          <Link to="/index">
            <HomeOutlined
              style={{
                fontSize: 28,
                marginRight: 10,
                color: 'rgba(0, 0, 0, 0.65)',
              }}
            />
          </Link>
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            重置
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
          <div className="pid-select-box">
            {pid}
            <DownCircleOutlined
              onClickCapture={e => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                setIsShowSelect(!isShowSelect);
              }}
              style={{ fontSize: 20, marginLeft: 10, cursor: 'pointer' }}
            />
            {isShowSelect ? (
              <Select
                onClick={e => {
                  e.stopPropagation();
                }}
                defaultValue={pid}
                className="pid-select"
                placeholder="请选择"
                optionFilterProp="children"
                showSearch
                onChange={onChangePid}
                onSearch={onSearch}
                filterOption={(input, option: any) =>
                  option.children.indexOf(input) >= 0
                }
              >
                {childrenArr}
              </Select>
            ) : (
              ''
            )}
          </div>
          <div className="operate">
            <MoreOutlined
              onClick={() => {
                setIsShowOprate(!isShowOprate);
              }}
              style={{ fontSize: 24, cursor: 'pointer' }}
            />
            <List
              className={`operate-box ${isShowOprate ? 'show' : ' none'}`}
              bordered
              dataSource={operateList}
              renderItem={(item: string) => (
                <List.Item
                  onClick={() => {
                    operateItem(item);
                  }}
                >
                  {/* <Typography.Text mark>[ITEM]</Typography.Text> */}
                  <span>{item}</span>
                </List.Item>
              )}
            />
          </div>
        </div>
        <Table
          style={{ overflowX: 'auto' }}
          rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
          pagination={false}
          size={'middle'}
          columns={columns}
          dataSource={errorList}
        />
        <Pagination
          onChange={onChangePage}
          style={{ textAlign: 'center', marginTop: 20 }}
          current={pageInfo.p}
          defaultPageSize={10}
          onShowSizeChange={onShowSizeChange}
          total={total}
        />
      </Spin>
    </div>
  );
};
