import type { ApiResponse, apiFetch } from './fetch';

type FetchType<T, D> = typeof apiFetch<T, D>;
type FetchAdditionalInit<T, D> = Parameters<FetchType<T, D>>[1];

function ThrowErrorIfError<T, D>(result: ApiResponse<T, D>) {
  if (result.error) {
    throw new Error(result.error);
  }

  return result;
}

export class BaseApi<T = any, D = any> {
  private url: string;
  private fetch: FetchType<T, D>;
  constructor(url: string, fetch: FetchType<T, D>) {
    this.url = url;
    this.fetch = fetch;
  }

  async findAll(searchParams = '', options?: FetchAdditionalInit<T[], D>) {
    return ThrowErrorIfError(
      (await this.fetch(`${this.url}?${searchParams}`, options)) as ApiResponse<T[], D>
    );
  }

  async findOne(id: string, options?: FetchAdditionalInit<T, D>) {
    return ThrowErrorIfError(await this.fetch(`${this.url}/${id}`, options));
  }

  async post(body: any = {}, options?: FetchAdditionalInit<T, D>) {
    return ThrowErrorIfError(
      await this.fetch(`${this.url}`, {
        method: 'POST',
        body: JSON.stringify(body),
        ...options,
      })
    );
  }

  async put(id: string, body: any, options?: FetchAdditionalInit<T, D>) {
    return ThrowErrorIfError(
      await this.fetch(`${this.url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        ...options,
      })
    );
  }

  async patch(id: string, body: any, options?: FetchAdditionalInit<T, D>) {
    return ThrowErrorIfError(
      await this.fetch(`${this.url}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        ...options,
      })
    );
  }

  async delete(id: string, options?: FetchAdditionalInit<T, D>) {
    return ThrowErrorIfError(
      await this.fetch(`${this.url}/${id}`, {
        method: 'DELETE',
        ...options,
      })
    );
  }

  async get(path: string, options?: FetchAdditionalInit<T, D>) {
    return ThrowErrorIfError(await this.fetch(`${this.url}/${path}`, options));
  }
}
