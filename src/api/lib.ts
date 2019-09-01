export interface ApiResponse<T> {
  status: number;
  data: T;
}

export interface StatusedResponse<S extends number, R> extends ApiResponse<R> {
  status: S;
}

export function api<T> (num: number, fn: (n: number) => T) {
  const n = Math.floor(Math.random() * num)
  return new Promise<T>((resolve, reject) => resolve(fn(n)))
}
