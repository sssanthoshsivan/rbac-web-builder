import { describe, it, expect } from "vitest";
import { can } from "../lib/permissions";

describe("RBAC Permissions", () => {
  it("editor cannot publish", () => {
    expect(can("editor", "publish_page")).toBe(false);
  });

  it("admin can publish", () => {
    expect(can("admin", "publish_page")).toBe(true);
  });

  it("viewer cannot edit", () => {
    expect(can("viewer", "edit_page")).toBe(false);
  });
});
