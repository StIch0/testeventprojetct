import { Endpoints } from '../enums';

interface RequestParams {
  endpoint: Endpoints;
  method: HTTPMethod;
  body?: BodyInit_;
  query?: string;
}

type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export { RequestParams, HTTPMethod };
