import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseURL: string = 'http://localhost:5000/student/';

  constructor(private http: HttpClient) {}

  removeAll() {
    return this.http.post(
      this.baseURL + 'remove',
      {},
      { responseType: 'text' }
    );
  }
}
