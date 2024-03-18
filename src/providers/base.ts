import type { Axios, AxiosRequestConfig } from "axios";
import axios from "axios";

export class HttpProvider {
  private axios: Axios;

  constructor(baseURL: string) {
    this.axios = axios.create({ baseURL });
  }

  async request<T>(option: AxiosRequestConfig) {
    try {
      const { data } = await this.axios.request<{ code: number; data: T; msg: string }>(option);
      return (data?.data as T) ?? (data as T);
    } catch (e: any) {
      console.log("Request error", e?.message ?? "Unknown");
      throw e;
    }
  }

  get<T>(url: string, params = {}, options = {}) {
    return this.request<T>({
      url,
      params: {
        ...params,
        _: +new Date(),
      },
      ...options,
    });
  }

  post<T>(url: string, data: any, options = {}) {
    return this.request<T>({
      url,
      method: "post",
      data,
      ...options,
    });
  }

  delete<T>(url: string, data: any, options = {}) {
    return this.request<T>({
      url,
      method: "delete",
      data,
      ...options,
    });
  }
}
