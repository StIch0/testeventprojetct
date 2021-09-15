import { RequestParams } from './types';

interface ITimeoutProps<T> {
  ms?: number;
  promise: Promise<T>;
}

const timeout = <T,>({ ms = 1000, promise }: ITimeoutProps<T>) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Проверьте соединение с интернетом'));
    }, ms);
    setTimeout(() => {
      promise.then(resolve, reject);
    }, 10000);
  });
};

// Код со Stack Overflow
// export function timeout(ms, promise) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       reject(new Error('timeout'));
//     }, ms);
//     promise.then(resolve, reject);
//   });
// }

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

    const response = await timeout({
      promise: fetch(url, requestInit),
      ms: 1000
    });

    const responseJSON = (await response.json()) as T;

    return responseJSON;
  } catch (error) {
    return Promise.reject(error);
  }
};
