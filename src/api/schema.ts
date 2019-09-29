export type ValidationErrors<K extends string = string> = Partial<Record<K, string>>;

export interface UserParams {
  id: number;
}

export interface User {
  name: string;
  birthday: string;
}

export interface PublicUser {
  name: string;
  birthday: string;
  nickname: string;
}

export interface Admin {
  name: string;
  level: number;
}
