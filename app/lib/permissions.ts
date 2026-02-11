import { Role } from "../domain/user";

export type Action = "create_page" | "edit_page" | "publish_page" | "view_page";

const permissions: Record<Action, Role[]> = {
  create_page: ["editor", "admin", "super-admin"],
  edit_page: ["editor", "admin", "super-admin"],
  publish_page: ["admin", "super-admin"],
  view_page: ["viewer", "editor", "admin", "super-admin"],
};

export function can(role: Role, action: Action): boolean {
  return permissions[action].includes(role);
}
