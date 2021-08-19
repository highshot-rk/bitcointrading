import { useState, useEffect } from 'react';
import axios, { AxiosResponse, Method } from 'axios';

type Setter<T> = (data: T) => void;

export function useCoinApi<T>(
  method: Method,
  url: string
): [T | undefined, Setter<T>] {
  const [data, setData] = useState<T>();

  useEffect(() => {
    coinApi(method, url, (data_: T) => setData(data_));
  }, [method, url]);
  return [data, setData];
}

export function coinApi<T>(
  method: Method,
  url: string,
  callback: Setter<T>,
  data = {}
): void {
  axios({
    method: method,
    url: url,
    data,
  }).then((response: AxiosResponse<T>) => callback(response.data));
}
