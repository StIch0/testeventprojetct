import { RequestParams } from './types';

export const fetchData = async <T,>(
  requestParams: RequestParams
): Promise<T> => {
  try {
    const { endpoint, method, body, query = '' } = requestParams;
    const url = `https://api.github.com${endpoint}?${query}`;

    const headers = new Headers({
      Accept: 'application/vnd.github.v3+json'
    });

    const requestInit: RequestInit = {
      method,
      headers,
      body
    };

    const response = await fetch(url, requestInit);

    const responseJSON = (await response.json()) as T;

    return responseJSON;
  } catch (error) {
    return Promise.reject(error);
  }
};
