import axios, { AxiosRequestConfig } from 'axios';

type Options<D = object> = AxiosRequestConfig<D> & { body?: AxiosRequestConfig<D>['data'] };
const request = async <T extends object>(url: string, options?: Options) => {
  const response = await axios<T>({
    ...options,
    url,
    method: options?.method || 'GET',
    data: options?.body || options?.data,
  });

  return response.data;
};

export default request;
