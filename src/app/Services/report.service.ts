import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { apiurl } from '../Models/apiurl';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  apiurl = `${apiurl.URL}/export`
  constructor(private http: HttpClient) { }

  getReportDownloadLink(): Observable<string> {
    return this.http.get<string>(`${this.apiurl}`).pipe(
      tap(data => console.log(data))
    );
  }
}
