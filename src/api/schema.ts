export type ValidationErrors<K extends string = string> = Partial<Record<K, string>>;

export interface UserParams {
  id: number;
}

export interface User {
  name: string;
  birthday: string;
}
