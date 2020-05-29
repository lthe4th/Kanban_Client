import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { Board } from '../Models/Board'
import { apiurl } from '../Models/apiurl';


const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/JSON' })
};

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  apiurl = `${apiurl.URL}/boards`
  constructor(private http: HttpClient) { }

  Boards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiurl}`);
  }

  NewBoard(newBoard: Board): Observable<Board> {
    return this.http.post<Board>(`${this.apiurl}/new`, newBoard, httpOptions);
  }

  ModBoard(modboard: Board): Observable<Board> {
    return this.http.put<Board>(`${this.apiurl}/mod`, modboard, httpOptions);
  }

  DeleteBoard(Id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiurl}/delete/${Id}`)
  }

  DeleteEverything(): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiurl}/delete/clear/everything`)
  }
  // NewBoard(newBoard: Board){
  //   console.log(newBoard.boardName);
  // }
}
