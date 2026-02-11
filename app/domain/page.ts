export type PageStatus = "draft" | "published";

export interface Page {
  id: string;
  title: string;
  content: string;
  status: PageStatus;
  authorId: string;
}
