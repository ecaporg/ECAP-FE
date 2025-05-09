import { apiFetch } from "./fetch";

export class BaseApi<T = any, D = any> {
  private url: string;
  private fetch: typeof apiFetch<T, D>;
  constructor(url: string, fetch: typeof apiFetch<T, D>) {
    this.url = url;
    this.fetch = fetch;
  }

  async getAll() {
    return await this.fetch(`${this.url}`);
  }

  async getById(id: string) {
    return await this.fetch(`${this.url}/${id}`);
  }

  async post(body: any) {
    return await this.fetch(`${this.url}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async put(id: string, body: any) {
    return await this.fetch(`${this.url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async patch(id: string, body: any) {
    return await this.fetch(`${this.url}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  async delete(id: string) {
    return await this.fetch(`${this.url}/${id}`, {
      method: "DELETE",
    });
  }
}
