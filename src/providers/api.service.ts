import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ApiService {

  public static url: string = 'https://api.neoplace.io/api';

  public static token: string;

  constructor(private http: HttpClient) {

  }

  get(endpoint: string, params?: any) {
    let p = new HttpParams();
    if (params) {
      for (let k in params) {
        p = p.append(k, params[k]);
      }
    }
    let headers = new HttpHeaders();
    if(ApiService.token) {
      headers = headers.append("Authorization", ApiService.token);
    }
    return this.http.get(ApiService.url + '/' + endpoint, {params: p, headers: headers});
  }

  getFull(endpoint: string, params?: any) {
    let p = new HttpParams();
    if (params) {
      for (let k in params) {
        p = p.append(k, params[k]);
      }
    }
    let headers = new HttpHeaders();
    if(ApiService.token) {
      headers = headers.append("Authorization", ApiService.token);
    }
    return this.http.get(endpoint, {params: p, headers: headers});
  }

  post(endpoint: string, params?: any) {
    let p = new HttpParams();
    if (params) {
      for (let k in params) {
        p = p.append(k, params[k]);
      }
    }
    let headers = new HttpHeaders();
    if(ApiService.token) {
      headers = headers.append("Authorization", ApiService.token);
    }
    return this.http.post(ApiService.url + '/' + endpoint, p, {headers: headers});
  }

  postFull(endpoint: string, params?: any) {
    let p = new HttpParams();
    if (params) {
      for (let k in params) {
        p = p.append(k, params[k]);
      }
    }
    return this.http.post(endpoint, p, {observe: "response"});
  }
}
