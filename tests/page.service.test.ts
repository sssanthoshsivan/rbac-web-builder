import { describe, it, expect } from "vitest";
import { pageService } from "../application/page.service";

describe("Page Service RBAC", () => {
  it("editor cannot publish", () => {
    const page = pageService.create(
      "Test",
      "Content",
      "editor",
      "user-1"
    );

    expect(() =>
      pageService.publish(page.id, "editor")
    ).toThrow("Unauthorized");
  });

  it("admin can publish", () => {
    const page = pageService.create(
      "Test",
      "Content",
      "editor",
      "user-1"
    );

    const published = pageService.publish(page.id, "admin");

    expect(published.status).toBe("published");
  });

  it("viewer cannot create page", () => {
    expect(() =>
      pageService.create(
        "Test",
        "Content",
        "viewer",
        "user-1"
      )
    ).toThrow("Unauthorized");
  });
});
