import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<TResponse>(url: string): Observable<TResponse> {
    return this.httpClient.get<TResponse>(url);
  }

  post<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Observable<TResponse> {
    return this.httpClient.post<TResponse>(url, body);
  }

  put<TRequest, TResponse>(url: string, body: TRequest): Observable<TResponse> {
    return this.httpClient.put<TResponse>(url, body);
  }

  delete<TResponse>(url: string): Observable<TResponse> {
    return this.httpClient.delete<TResponse>(url);
  }
}
