import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiconnectorService {

  constructor(private http: HttpClient) { }

  login(obj: {}): Observable<{}> {
    return this.http.post('http://127.0.0.1:5000/login', obj);
  }

  logout(obj: {}): Observable<{}> {
    return this.http.post('http://127.0.0.1:5000/logout', obj);
  }

  sendBuchung(obj: {}): Observable<{}> {
    return this.http.post('http://127.0.0.1:5000/sendBuchung', obj);
  }
  updateBuchung(obj: {}): Observable<{}> {
    return this.http.put('http://127.0.0.1:5000/sendBuchung', obj);
  }
  deleteBuchung(obj: {}): Observable<{}> {
    return this.http.delete('http://127.0.0.1:5000/sendBuchung', obj);
  }

  getBuchungen(from: Date, to: Date) {
    return this.http.get('http://127.0.0.1:5000/getBuchungen');
  } 
}
