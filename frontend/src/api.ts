import axios from "axios";
import auth0 from "./auth0/auth0-util";

class Api {
  private buildHeaders(): any {
    return {
      headers: { Authorization: "Bearer " + auth0.getIdToken() }
    };
  }

  public get(url: string): Promise<object | undefined> {
    return axios.get(url, this.buildHeaders());
  }

  public post(url: string): Promise<object | undefined> {
    return axios.post(url, this.buildHeaders());
  }
}

const api = new Api();
export default api;
