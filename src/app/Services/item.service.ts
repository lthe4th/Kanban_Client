import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { Item } from '../Models/Item'
import { apiurl } from '../Models/apiurl';

const httpOption = {
  headers: new HttpHeaders({ 'content-type': 'application/JSON' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // apiurl = "https://localhost:5001/api/items";
  apiurl = `${apiurl.URL}/items`
  constructor(private http: HttpClient) { }

  GetItems(Id: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiurl}/${Id}`)
  }
  NewItem(newItem: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiurl}/new`, newItem, httpOption)
  }
  ModItem(moditem: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiurl}/mod`, moditem, httpOption);
  }
  DeleteItem(Id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiurl}/delete/${Id}`);
  }
}
