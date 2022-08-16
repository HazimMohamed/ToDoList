import { Injectable } from '@angular/core';
import * as request from 'superagent';
import {Response, SuperAgentRequest} from 'superagent';

@Injectable({
  providedIn: 'root'
})
class BackendService {

  private backendUrl: string;

  constructor() {
    this.backendUrl = process.env['BACKEND_URL'] ?? 'http://127.0.0.1:3000/todo';
  }

  sendBackendRequest(method: Method, url: string, payload: any = undefined): Promise<any> {
    url = new URL(url, this.backendUrl).toString();
    return new Promise<any>((resolve, reject) => {
      this.multiplexHttpMethod(method, url)
        .set('Content-Type', 'application/json')
        .send(payload ? JSON.stringify(payload) : '')
        .then((response: Response) => {
          if (response.status == 200) {
            resolve(JSON.parse(response.body));
          } else {
            reject(`Failed to call method [${method.toString()}] on url [${url.toString()}]. Received status code: ${response.status}. Message: ${response.body}`);
          }
      });
    });
  }

  private multiplexHttpMethod(method: Method, fullUrl: string): SuperAgentRequest {
    switch (method) {
      case Method.GET:
        return request.get(fullUrl);
      case Method.POST:
        return request.post(fullUrl);
      case Method.DELETE:
        return request.del(fullUrl);
    }
  }
}

enum Method {
  GET = 0,
  POST = 1,
  DELETE = 2
}

export {BackendService, Method}
