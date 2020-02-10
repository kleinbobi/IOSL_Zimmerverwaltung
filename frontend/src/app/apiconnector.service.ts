import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiconnectorService {

  constructor(private http: HttpClient) { }

  sendPost(url: string, obj: {}): Observable<{}> {
    return this.http.post(url, obj);
  }
}
