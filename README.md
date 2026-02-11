# RBAC Page Builder – Next.js + TypeScript

## Overview

This project demonstrates server-side Role-Based Access Control (RBAC) in a minimal WYSIWYG page builder with draft → preview → publish flow.

Live Demo: https://rbac-web-builder-1eo8.vercel.app/

---

## Roles

- viewer → can view published content
- editor → can create and edit drafts
- admin → can publish content
- super-admin → full access

---

## Architecture

The application follows a clean layered structure:

/domain
- Pure domain models (User, Page)

application/
- Business logic (PageService)
- RBAC enforced at service layer

infrastructure/
- In-memory repository (swappable with DB)

lib/
- Centralized permission matrix

app/
- API routes (thin layer)
- UI (minimal builder)

---

## RBAC Design

Permissions are centralized in `lib/permissions.ts`.

All role checks are enforced in the application layer (`page.service.ts`).

The UI does NOT control access — the backend does.

This ensures security even if API routes are manually invoked.

---

## Draft / Publish Flow

- Page is created as "draft"
- Only admin or super-admin can publish
- Viewer cannot create or edit
- Drafts are restricted based on role

---

## Testing

Unit tests validate:

- Editor cannot publish
- Viewer cannot create
- Admin can publish

Tests run via Vitest.

---

## CI/CD

On each commit:
- GitHub Actions runs unit tests
- If tests pass, Vercel builds the application

---

## Trade-offs (Time Constrained)

- In-memory storage used instead of database
- Authentication simplified (role passed for demonstration)
- Minimal WYSIWYG using textarea

These decisions were made to prioritize secure RBAC enforcement and architectural clarity.

---

## Future Improvements

- Replace in-memory store with persistent DB
- Add real authentication (NextAuth)
- Role-based middleware
- Rich text editor integration
- Audit logging
