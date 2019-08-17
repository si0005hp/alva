import axios, { AxiosResponse } from "axios";
import auth0 from "./auth0/auth0-util";

class Api {
  private buildHeaders(): any {
    return {
      headers: { Authorization: "Bearer " + auth0.getIdToken() }
    };
  }

  public get<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
    return axios.get(url, this.buildHeaders());
  }

  public post<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
    return axios.post(url, this.buildHeaders());
  }
}

const api = new Api();
export default api;
