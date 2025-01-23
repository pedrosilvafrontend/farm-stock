// export interface PageEvent {
//   pageIndex: number;
//   pageSize: number;
// }

export interface PaginatedResponse<T> {
  data: T[];
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
}
