import { Effect, Reducer, Subscription } from 'umi';
import { projectList } from '../../config/project.json';

export interface GlobalModelState {
  list: Array<ProjectItem>;
}

export interface GlobalModelType {
  namespace: string;
  state: GlobalModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    add: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

interface ProjectItem {
  name: string;
  key: string;
  desc: string;
  type: string;
}

export default {
  namespace: 'products',
  state: {
    list: projectList,
  },
  reducers: {
    // 地铁老爷爷看手机.jpg
    add(state: GlobalModelState, { payload: number }: { payload: number }) {
      return {
        ...state,
        ...{
          list: [...state.list, number],
        },
      };
    },
  },
};
