export type Role = "viewer" | "editor" | "admin" | "super-admin";

export interface User {
  id: string;
  role: Role;
}
