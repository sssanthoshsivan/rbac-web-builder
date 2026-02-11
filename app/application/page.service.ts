import { Page } from "../domain/page";
import { pageRepository } from "../infrastructure/page.repository";
import { can } from "../lib/permissions";
import { Role } from "../domain/user";

function generateId() {
  return crypto.randomUUID();
}

export const pageService = {
  create(title: string, content: string, role: Role, userId: string) {
    if (!can(role, "create_page")) {
      throw new Error("Unauthorized");
    }

    const page: Page = {
      id: generateId(),
      title,
      content,
      status: "draft",
      authorId: userId,
    };

    return pageRepository.save(page);
  },

  edit(id: string, title: string, content: string, role: Role) {
    if (!can(role, "edit_page")) {
      throw new Error("Unauthorized");
    }

    const page = pageRepository.findById(id);
    if (!page) throw new Error("Page not found");

    page.title = title;
    page.content = content;

    return pageRepository.save(page);
  },

  publish(id: string, role: Role) {
    if (!can(role, "publish_page")) {
      throw new Error("Unauthorized");
    }

    const page = pageRepository.findById(id);
    if (!page) throw new Error("Page not found");

    page.status = "published";

    return pageRepository.save(page);
  },

  getById(id: string, role: Role) {
    const page = pageRepository.findById(id);
    if (!page) throw new Error("Page not found");

    if (page.status === "draft" && !can(role, "edit_page")) {
      throw new Error("Unauthorized");
    }

    return page;
  },
};
