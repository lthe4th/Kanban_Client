import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { Todo } from '../Models/Todo'
import { apiurl } from '../Models/apiurl';

const httpOption = {
  headers: new HttpHeaders({ 'content-type': 'application/JSON' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // apiurl = "https://localhost:5001/api/todos";
  apiurl = `${apiurl.URL}/todos`
  constructor(private http: HttpClient) { }

  Todos(Id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiurl}/board/${Id}`);
  }

  NewTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiurl}/new`, newTodo, httpOption);
  }

  ModTodo(modtodo : Todo) : Observable<Todo>{
    return this.http.patch<Todo>(`${this.apiurl}/mod`,modtodo,httpOption);
  }

  deleteTodo(Id: number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.apiurl}/delete/${Id}`);
  }

}
