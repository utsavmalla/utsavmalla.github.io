# Project rules

- Use strict TypeScript patterns; do not silence lint/type errors without a narrow reason.
- Preserve public data contracts for `Project`, `ExperienceItem`, `Skill`, and `Cv`.
- Keep frontend fallback behavior intact for public portfolio sections.
- When changing static portfolio content, update both `src/data/*` and `backend/src/seed-data/*`.
- Put reusable UI primitives in `src/components/ui/`.
- Keep backend routes focused on HTTP concerns; place model-specific operations in `backend/src/models/*`.
- Project admin edit/delete routes use `projectId` for Mongo `_id`.
- Project soft delete sets `deletedAt` and `deletedBy`; do not hard delete by default.
- CV files stay in Supabase Storage; MongoDB stores CV metadata only.

