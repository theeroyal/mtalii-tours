# Debug Report

Date: 2026-06-08

## Summary

Performed a source and tooling debug pass for the Next.js app. Fixed the blocking lint errors, added a missing ESLint config, corrected a client-side tour detail bug, and removed an invalid nested link pattern on the home page.

## Fixed

- Added `.eslintrc.json` extending `next/core-web-vitals` so linting no longer prompts for interactive setup.
- Fixed `/tours/[id]` so valid tour pages do not render `notFound()` before client-side package data loads.
- Replaced unescaped apostrophes and quotes in JSX text that caused ESLint errors.
- Normalized several visible UI symbols/arrows to ASCII text or HTML entities for more reliable display across terminals and browsers.
- Removed an unused `useRouter` import from the blog detail page.
- Replaced an invalid nested `<Link>` wrapper around the home page blog preview card with a neutral `<div>`.

## Validation

- `.\node_modules\.bin\eslint.cmd src --ext .js,.jsx`
  - Result: passed with 0 errors.
  - Remaining: 17 warnings.

## Remaining Warnings

- Multiple pages still use raw `<img>` tags. Next.js reports these as performance warnings and recommends `next/image`.
- `src/app/admin/page.js` has a `react-hooks/exhaustive-deps` warning because `updateAttempts` is referenced inside `useEffect` but not included in the dependency array.

## Build Status

The Next CLI currently hangs before the normal compile phase:

- `npm.cmd run build`
- `.\node_modules\.bin\next.cmd build`
- `.\node_modules\.bin\next.cmd build --no-lint`
- `npm.cmd run lint`

All of these print the Next.js startup banner and then stall until timeout. Direct ESLint works, so the source lint errors were still verifiable and fixed. There are also several long-running `node.exe` processes in the workspace environment, which may be existing dev servers or stuck Next workers. I did not stop them because they may belong to the user's active session.

## Recommended Next Steps

- Stop or restart the existing Node/Next processes, then rerun `npm.cmd run build`.
- Convert high-impact raw `<img>` usage to `next/image`, starting with hero and card images.

## Admin Debug Pass

Performed an admin-specific debug pass covering:

- `src/app/admin/page.js`
- `src/app/admin/dashboard/page.js`
- Admin package, blog, destination, and password-change pages
- `src/lib/auth.js`

### Admin Fixes

- Added a package currency selector to admin package create/edit forms. Admins can now choose USD or KES, and package records save the selected `currency`.
- Updated the admin package list to display prices as `$` for USD and `KSh` for Kenya shillings, defaulting old packages to USD.
- Fixed the admin login countdown logic by memoizing `updateAttempts` and moving the lockout timer into its own effect. This resolves the prior `react-hooks/exhaustive-deps` warning for `src/app/admin/page.js`.
- Fixed `BlogForm` and `DestinationForm` route detection. The shared forms previously treated `/new` pages as edit pages when no `id` param existed, which could leave new blog and destination pages stuck on `Loading...`.
- Removed the invalid nested-link pattern in the admin blog manager. Blog cards no longer wrap View/Edit/Delete controls in an outer `<Link>`, so Delete will not accidentally navigate to the post view.
- Fixed the packages manager layout so the package list is no longer nested inside the `<nav>` element.
- Normalized admin back-link arrows and date separators to plain text or HTML entities for more reliable display.

### Admin Validation

- `.\node_modules\.bin\eslint.cmd src\app\admin src\lib\auth.js --ext .js,.jsx --quiet`
  - Result: passed with 0 errors.
- `.\node_modules\.bin\eslint.cmd src\app\admin\dashboard\packages src\app\admin\page.js src\lib\auth.js --ext .js,.jsx --quiet`
  - Result: passed with 0 errors after the currency selector update.

### Admin Notes

- The admin still uses browser `localStorage` for authentication and content storage. This is fine for a prototype, but it is not secure for production admin access.
- Admin image warnings may remain because several admin pages still use raw `<img>` tags instead of `next/image`.
- Several long-running `node.exe` processes are still active, so full Next build validation should be rerun after restarting the local Node/Next processes.
