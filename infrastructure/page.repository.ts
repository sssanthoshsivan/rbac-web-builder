import { Page } from "../domain/page";

const pages = new Map<string, Page>();

export const pageRepository = {
  save(page: Page) {
    pages.set(page.id, page);
    return page;
  },

  findById(id: string) {
    return pages.get(id) || null;
  },

  findAll() {
    return Array.from(pages.values());
  },
};
