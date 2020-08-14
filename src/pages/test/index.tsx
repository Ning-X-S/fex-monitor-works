import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'umi';
import './index.less';
import { message } from 'antd';
import { Line, PercentStackedBar, ColumnLine } from '@ant-design/charts';
import request from 'umi-request';

import { getLocale } from 'umi';
console.log(getLocale());

function Test() {
  const uvData = [
    {
      time: '2019-03',
      value: 350,
    },
    {
      time: '2019-04',
      value: 900,
    },
    {
      time: '2019-05',
      value: 300,
    },
    {
      time: '2019-06',
      value: 450,
    },
    {
      time: '2019-07',
      value: 470,
    },
  ];
  const transformData = [
    {
      time: '2019-03',
      count: 800,
    },
    {
      time: '2019-04',
      count: 600,
    },
    {
      time: '2019-05',
      count: 400,
    },
    {
      time: '2019-06',
      count: 380,
    },
    {
      time: '2019-07',
      count: 220,
    },
  ];
  const config = {
    title: {
      visible: true,
      text: '柱线混合图',
    },
    description: {
      visible: true,
      text: '自定义图形细节',
    },
    data: [uvData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    columnConfig: {
      columnSize: 24,
      color: '#586bce',
    },
    lineConfig: {
      color: '#29cae4',
      smooth: true,
      point: { visible: true },
      label: { visible: true },
    },
  };
  const datas = [
    {
      country: 'Asia',
      year: '1750',
      value: 502,
    },
    {
      country: 'Asia',
      year: '1800',
      value: 635,
    },
    {
      country: 'Asia',
      year: '1850',
      value: 809,
    },
    {
      country: 'Asia',
      year: '1900',
      value: 947,
    },
    {
      country: 'Asia',
      year: '1950',
      value: 1402,
    },
    {
      country: 'Asia',
      year: '1999',
      value: 3634,
    },
    {
      country: 'Asia',
      year: '2050',
      value: 5268,
    },
    {
      country: 'Africa',
      year: '1750',
      value: 106,
    },
    {
      country: 'Africa',
      year: '1800',
      value: 107,
    },
    {
      country: 'Africa',
      year: '1850',
      value: 111,
    },
    {
      country: 'Africa',
      year: '1900',
      value: 133,
    },
    {
      country: 'Africa',
      year: '1950',
      value: 221,
    },
    {
      country: 'Africa',
      year: '1999',
      value: 767,
    },
    {
      country: 'Africa',
      year: '2050',
      value: 1766,
    },
    {
      country: 'Europe',
      year: '1750',
      value: 163,
    },
    {
      country: 'Europe',
      year: '1800',
      value: 203,
    },
    {
      country: 'Europe',
      year: '1850',
      value: 276,
    },
    {
      country: 'Europe',
      year: '1900',
      value: 408,
    },
    {
      country: 'Europe',
      year: '1950',
      value: 547,
    },
    {
      country: 'Europe',
      year: '1999',
      value: 729,
    },
    {
      country: 'Europe',
      year: '2050',
      value: 628,
    },
  ];
  const configs = {
    title: {
      visible: true,
      text: '百分比堆叠条形图',
    },
    data: datas,
    xField: 'value',
    yField: 'year',
    stackField: 'country',
    color: ['#2582a1', '#f88c24', '#c52125', '#87f4d0'],
    label: {
      visible: true,
      formatter: v => {
        return v.toFixed(2);
      },
    },
  };
  const [list, setList] = useState([
    { _id: 111, _index: 'fex_jarvis_2020.07.01' },
  ]);
  const getListData = useCallback(async () => {
    try {
      const res = await request.get(
        '/api/record/search?p=1&size=20&pid=xz-works',
      );
      if (res.error_code === 0) {
        setList(list => res.data.list);
        message.success('Loading success');
      } else {
        message.error('Loading fail');
      }
    } catch (err) {
      console.log(err);
      message.error('Loading fail');
    }
  }, []);

  useEffect(() => {
    getListData();
  }, [getListData]);

  return (
    <div className="content">
      <div className="main">
        <ColumnLine {...config} />;
        <PercentStackedBar {...configs} />
        <Link to="/index">
          <h1 className="test">Page test</h1>
        </Link>
        {/* <ContentItem list={list} /> */}
        {list.map(item => (
          <h4 key={item._id}>{item._index}</h4>
        ))}
      </div>
    </div>
  );
}

function ContentItem(props: { list: any }) {
  const { list } = props;
  const elements = list.map((item: { _id: string }) => (
    <h4 key={item._id}>{item._id}</h4>
  ));
  return <div className="list-content-hook">{elements}</div>;
}

export default Test;
