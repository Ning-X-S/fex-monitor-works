import React from 'react';
import './index.less';
import { Tooltip, Collapse } from 'antd';

const { Panel } = Collapse;

type NullUndefined = null | undefined;

interface ItemInter {
  line: number;
  message: string;
  name: string | NullUndefined;
  source: string | NullUndefined;
  curr_error_index: number;
  column: number | null | undefined;
  error_line: Array<string>;
}

function onChangeColl(key: string | Array<string>) {
  console.log(key);
}

function ErrorStack(props: any): any {
  const info: any = props.info;
  const errorTitle: string = `${info._kind.replace(/^\S/, (s: string) =>
    s.toUpperCase(),
  )} ${info._type}`;
  console.log(info);
  info.stack = info.stack.map((item: any) => {
    return {
      ...{ error_line: [] },
      ...item,
    };
  });
  return (
    <div className="error-info">
      <h3
        style={{
          color: '#2f2936',
          fontWeight: 600,
          fontSize: 18,
        }}
      >{`${info._kind.replace(/^\S/, (s: string) => s.toUpperCase())} ${
        info._type.split(' ')[0]
      }`}</h3>
      <Tooltip
        style={{
          fontFamily: 'Monaco,Consolas,Courier New,monospace',
        }}
        title={errorTitle}
      >
        <span>{info.message}。</span>
      </Tooltip>
      <div className="collapse-box" style={{ marginTop: 10 }}>
        <Collapse
          defaultActiveKey={['1']}
          onChange={onChangeColl}
          expandIconPosition={'right'}
        >
          {info.stack.length > 0 ? (
            info.stack.map((item: ItemInter, index: number) => (
              <Panel
                className="panel-item"
                header={item.source || item.message}
                key={item.message + index}
              >
                {item.error_line.length ? (
                  item.error_line.map((text: string, idx: number) => (
                    <div
                      className={
                        idx + 1 === item.curr_error_index
                          ? 'curr-error-index pre-box'
                          : 'pre-box'
                      }
                      key={text + idx}
                    >
                      <div>{item.line - item.curr_error_index + 1 + idx}</div>
                      <pre>{text}</pre>
                    </div>
                  ))
                ) : (
                  <div>
                    Maybe this is not a mistake you wrote, it may be babel or
                    other plugins.
                  </div>
                )}
              </Panel>
            ))
          ) : (
            <div
              style={{
                lineHeight: '200px',
                textAlign: 'center',
                borderBottom: '1px solid #d9d9d9',
                fontSize: 18,
              }}
            >
              Not yet stack
            </div>
          )}
        </Collapse>
      </div>
    </div>
  );
}

export default ErrorStack;
