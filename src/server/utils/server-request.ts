import axios, { AxiosRequestConfig } from 'axios';

type Options<D = object> = AxiosRequestConfig<D> & { body?: AxiosRequestConfig<D>['data'] };
const serverRequest = async <T extends object>(url: string, options?: Options) => {
  try {
    const response = await axios<T>({
      ...options,
      url,
      baseURL: process.env.BASE_URL,
      method: options?.method || 'GET',
      params: options?.params,
      data: options?.body || options?.data,
    });

    return response.data;
  } catch (error) {
    console.error("erreur lors de la requete", error)
    // console.error(error.data);
  }
};

export default serverRequest;
