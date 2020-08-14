import { useState } from 'react';

export interface PublicStateParam {
  id?: string;
  pid?: string;
  loading?: boolean;
}

export interface PublicStateVal {
  id?: string;
  pid?: string;
  loading?: boolean;
  setId: Function;
  setPid: Function;
  setLoading: Function;
}

export function publicState(params: PublicStateParam): PublicStateVal {
  const [id, setId] = useState(params.id);
  const [pid, setPid] = useState(params.pid);
  const [loading, setLoading] = useState(params.loading);

  return { id, setId, pid, setPid, loading, setLoading };
}
