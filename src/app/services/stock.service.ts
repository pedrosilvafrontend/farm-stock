import { Injectable } from '@angular/core';
import { Stock } from '@app/models';
import { BaseService } from '@app/shared/base-data-table/base-service';

@Injectable({
  providedIn: 'root'
})
export class StockService extends BaseService<Stock> {
  constructor() {
    super('stocks');
  }

  // getStocks(page: number, perPage: number): Observable<PaginatedResponse<Stock>> {
  //   const params = new HttpParams()
  //     .set('_page', page.toString())
  //     .set('_per_page', perPage.toString());

  //   return this.http.get<PaginatedResponse<Stock>>(this.apiUrl, { params });
  // }

  // createStock(stock: Partial<Stock>): Observable<Stock> {
  //   return this.http.post<Stock>(this.apiUrl, stock);
  // }

  // updateStock(id: string, stock: Partial<Stock>): Observable<Stock> {
  //   return this.http.put<Stock>(`${this.apiUrl}/${id}`, stock);
  // }

  // deleteStock(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
