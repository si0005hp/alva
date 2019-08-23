import axios, {AxiosResponse} from 'axios';
import auth0 from './auth0/auth0-util';

class Api {
  private buildHeaders(): any {
    return {headers: {Authorization: 'Bearer ' + auth0.getIdToken()}};
  }

  public get<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
    return axios.get(url, this.buildHeaders());
  }

  public post<T = any, R = AxiosResponse<T>>(url: string, data?: any):
      Promise<R> {
    return axios.post(url, data, this.buildHeaders());
  }

  public patch<T = any, R = AxiosResponse<T>>(url: string, data?: any):
      Promise<R> {
    return axios.patch(url, data, this.buildHeaders());
  }
}

const api = new Api();
export default api;
