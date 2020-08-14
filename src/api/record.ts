import request from 'umi-request';

export interface basisDataInter {
  error_code: number;
  data: any;
  message: string;
  content?: string;
}

export function searchError(params: object = {}): Promise<basisDataInter> {
  return request.get('/api/search/error', {
    params: {
      ...params,
    },
  });
}

export function markCreate(params: object = {}): Promise<basisDataInter> {
  return request.post('/api/mark/create', {
    data: {
      ...params,
    },
  });
}

export function recordDetail(params: object = {}): Promise<basisDataInter> {
  return request.get('/api/record/detail', {
    params: {
      ...params,
    },
  });
}

export function recordSync(params: object = {}): Promise<basisDataInter> {
  return request.get('/api/record/sync', {
    params: {
      ...params,
    },
  });
}
