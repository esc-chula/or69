# AGENTS.md

This file provides guidance to Codex (claude.ai/code) when working with code in this repository.

## Project

Intania OR website: a Next.js 14 (App Router) site for incoming first-year students of the Faculty of Engineering, Chulalongkorn University (run by ESC / กวศ.). A student enters their student ID and sees their profile, advisor, subjects, timetable, faculty announcements, and shared classes with friends. UI copy is Thai.

## Commands

Package manager is **pnpm** (CI uses pnpm 8 and Node 20).

```bash
pnpm install
pnpm dev                 # next dev
pnpm build               # next build
pnpm lint                # next lint (eslint next/core-web-vitals)
pnpm type-check          # tsc --noEmit
pnpm test                # vitest in watch mode
pnpm test --run          # single run (what CI wants)
pnpm vitest run src/utils/__tests__/get-group-info.test.ts   # one file
pnpm vitest run -t "Get student data"                         # by test name
```

Copy `.env.local.example` to `.env.local` and fill in the data URLs before running locally.

## Architecture

### Data flow

There is no database. All data is JSON arrays at external URLs set through env vars. All four are **server-only** (no `NEXT_PUBLIC_` prefix, so Next.js never bundles them for the browser). Each one is read only by an edge route that returns a single record, so neither the URLs nor the full data sets reach the client:

- `OR_STUDENTS`: `src/app/api/students/[studentId]/route.ts`
- `OR_GROUPS`: `src/app/api/groups/[studentIndex]/route.ts`
- `OR_TEACHERS`: `src/app/api/teachers/[studentIndex]/route.ts`
- `OR_SUBJECTS`: `src/app/api/subjects/[subjectCode]/route.ts`

The groups, teachers and subjects routes share `src/utils/respond-with-item.ts`. The browser calls the routes through the `get-*-info` utils and `src/utils/data-fetcher.ts` (`fetch` with `cache: 'force-cache'`). The fetcher turns any 404 into `Data not found`, so the error message in a route's JSON body never reaches the UI.

A student's `index`, not their ID, is the key for everything else. `findGroupByStudentIndex` and `findTeacherByStudentIndex` (run by the routes) and `getExpEngSectionByStudentIndex` (run in the browser) each check whether the index falls in a `range.start..range.end` (or `studentStart..studentEnd`) window. `findSubjectByCode` merges duplicate subject rows that share a `code` into one subject with all their sections combined. Each `find*` lookup is in the same file as its `get-*-info` util.

Every `get-*-info` util and `find*` lookup first validates its input with `src/utils/validator.ts` and throws an `Error` with a fixed message. The tests assert on those message strings.

### Session / auth

`src/contexts/user-context.tsx` (`UserProvider`, which wraps the whole app in `src/app/layout.tsx`) holds all user state:

- `setUser(studentId)` fetches the student, then their teacher. For non-CEDT students it also fetches their group, the group's subjects and their EXP ENG section. It then stores the ID in the `sIdentifier` cookie (`src/utils/cookie.ts`).
- On mount it restores the session from that cookie.
- It also handles routing guards: with no student, every route redirects to `/`; with a student, `/` redirects to `/profile`.
- Pages read state with `useUser()`, so they are client components.

CEDT students (`cohort.cedtProgram`) skip the group and subject lookups. The subjects and schedule pages show a notice for them instead (`components/subjects/cedt-notice.tsx`).

### Cohort / yearly rollover config

Content that changes each year or semester lives in `src/config/`. Change it there rather than hardcoding it in pages:

- `cohort.ts`: batch number, academic year, the student ID prefix whitelist `studentIdPrefixes` and the `studentIdSuffix` (both used by `validateStudentId`, which pads each prefix with digits so the ID is 10 digits long; an 8-digit prefix therefore allows exactly one student), the `isSystemOpen` toggle and open date shown on the landing page, the current `semester`, and from that the EXP ENG subject code/name and `showGroupSubject`.
- `announcement-posts.ts`: Instagram posts and images for `/announcement` (images are in `src/assets/images/announcement/`).
- `map-markers.ts`: building markers on the schedule page map.

### Layout

- Route groups `src/app/(max-w)/` (content capped at `max-w-6xl`) and `src/app/(no-max-w)/` (full width, used by `/schedule`) only control page width. They do not affect URLs.
- The bottom nav items are defined in `src/components/nav/links.ts`.
- `src/components/ui/` holds shadcn/ui components (`components.json`). The `cn()` helper is in `src/lib/utils.ts`; fonts are in `src/libs/font.ts`. These are two different directories.
- The schedule image download uses `html2canvas` through `src/utils/take-screenshot.ts`.

### Deployment

`wrangler.toml` (`nodejs_compat`) and `export const runtime = 'edge'` on the API route are there for Cloudflare deployment. Any new dynamic route or API route also needs `runtime = 'edge'`.

## Conventions and gotchas

- Formatting: there are two Prettier configs. `.prettierrc` takes precedence over `.prettierrc.json` and matches the code: 4-space indent, single quotes, JSX single quotes, `trailingComma: es5`, and the tailwind class-sorting plugin.
- Import alias: `@/*` maps to `src/*`. Shared types are in `src/types/*.d.ts`, and `Program` is a union of Thai program names.
- Tests (Vitest + jsdom + Testing Library, set up in `setup-tests.js`) live in `__tests__/` folders next to the code. They mock `../data-fetcher` with `vi.mock`.
- Tests that depend on yearly config should not break at rollover. `validator.test.ts` and `get-student-info.test.ts` mock `@/config/cohort` with their own `studentIdPrefixes`, and the EXP ENG test data in `get-subject-info.test.ts` reads `cohort.expEngSubjectCode`. Follow the same pattern rather than hardcoding the current batch or semester.
- The CI workflow (`.github/workflows/or-test.yml`) uses `--filter=or69`, but the `name` in `package.json` is `or`.
