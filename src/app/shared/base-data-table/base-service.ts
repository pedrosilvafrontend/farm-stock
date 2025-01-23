import { HttpClient, HttpParams } from "@angular/common/http";
import { inject } from "@angular/core";
import { PaginatedResponse } from "@app/models";
import { Observable } from "rxjs";
import { environment } from '@environments/environment';

export abstract class BaseService<T> {
  protected http: HttpClient = inject(HttpClient);
  private path: string = '';

  protected get apiUrl(): string {
    return `${environment.apiUrl}/${this.path}`;
  }

  constructor(path: string) {
    this.path = path;
  }

  getData(page: number, perPage: number): Observable<PaginatedResponse<T>> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_per_page', perPage.toString());
    return this.http.get<PaginatedResponse<T>>(this.apiUrl, { params });
  }

  createItem(item: Partial<T>): Observable<T> {
    return this.http.post<T>(this.apiUrl, item);
  }

  updateItem(id: string | number, item: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
