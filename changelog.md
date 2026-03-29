# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2026-03-29

### Added
- **Bookmarklet Sidebar Feature**: New JavaScript bookmarklet button that opens `https://passgenius.techhive.net` in a side-aligned window using `window.open` with specific feature flags for sidebar mode (350x900, left position).
  - Path: `src/app/page.tsx`
  - Code: `javascript:(function(){window.open('https://passgenius.techhive.net','pg-sidebar','width=350,height=900,left=0,top=0,menubar=0,toolbar=0,location=0,status=0,scrollbars=1')})()`
- **Dynamic RSS Feed**: Added a validated XML RSS route at `/changelog/rss` using `NextResponse` to serve update history as machine-readable data.
  - Path: `src/app/changelog/rss/route.ts`
- **SEO Metadata & Search Compliance**: Established root-level SEO meta-files to improve crawling efficiency and project discoverability.
  - Path: `public/robots.txt`, `public/sitemap.xml`

### Changed
- **Global UI Contrast Overhaul**: Increased contrast ratios across primary and secondary UI elements—specifically replacing `/40` and `/50` opacity masks with `/80` and `/90` equivalents for text readability on dark gradients.
  - Path: `src/components/footer.tsx`, `src/components/password-generator.tsx`, `src/components/crack-time-estimator.tsx`
- **Bookmarklet Visual Redesign**: Moved the "Drag to Bar" indicator INSIDE the bookmarklet card using the `CornerRightUp` icon from `lucide-react`. Added micro-animations for hover state transitions.
  - Path: `src/app/page.tsx`
- **Authorship Attribution**: Integrated official developer credit "Author: AJ Batac" with a link back to `ajbatac.github.io` in the specialized "Support the Developer" section.
  - Path: `src/components/footer.tsx`
- **Version Lifecycle**: Incremented project version to `0.3.0` and converted the version text in the footer into a direct navigable link to `/changelog`.
  - Path: `src/components/footer.tsx`

### Fixed
- **Bookmarklet Icon Restoration**: Fixed an issue where the brand icon from the bookmarklet button had been unintentionally removed during a previous style sweep.
  - Path: `src/app/page.tsx`

## [0.2.0] - 2026-03-21

### Changed
- **Rebranding & Copy Update**: Completely removed "open-source" terminology across the app (`site.webmanifest`, `src/app/page.tsx`, `src/app/privacy/page.tsx`, `README.md`) to reflect absolute local security. Edited hero copy to emphasize offline capabilities.
- **UI Enhancements**: 
  - Centralized legal document design through a new `LegalLayout` component combining a cyber-futuristic animated background (`src/components/legal-layout.tsx`).
  - Adjusted button labels: "Regenerate Passwords" to "Regenerate" (`src/components/password-generator.tsx`), and Section headers "Configuration" to "Password Options", "Vault" to "Results Vault".
  - Cleaned up "Smart Suggestions" label to remove its icon for a sleeker look (`src/components/ai-suggester.tsx`).
- **Global Meta Layout**: Injected correct `openGraph` and `twitter` meta tags referencing `/og.png` for highly optimized social sharing (`src/app/layout.tsx`).

### Fixed
- **Navigation Overflow**: Addressed z-index and spacing issues causing the "Back to Home" button on legal pages to overlap or un-click. Button repositioned securely beneath fixed navigations (`src/components/legal-layout.tsx`).

## [0.1.0] - 2026-03-05

### Added
- **AI-Powered Password Suggestions**: Integrated a new feature using Genkit to provide AI-driven recommendations for password configurations based on the type of service (e.g., Banking, Social Media).
  - Path: `src/components/ai-suggester.tsx`
  - AI Flow: `src/ai/flows/suggest-optimal-password-config.ts`
  - Server Action: `src/app/actions.ts`
- **Two-Column Layout**: Restructured the main interface into a responsive two-column layout for improved user experience. The left column contains password generation options, and the right column displays the generated passwords.
  - Path: `src/components/password-generator.tsx`
- **Dark Mode**: Implemented a theme provider and a toggle switch to allow users to switch between light and dark modes.
  - Path: `src/components/theme-toggle.tsx`
  - Path: `src/components/theme-provider.tsx`
  - Dependency: `next-themes`
- **Large Regenerate Button**: Added a full-width "Regenerate Passwords" button at the bottom of the output card for easier access.
  - Path: `src/components/password-generator.tsx`
  - Code: `<Button onClick={generatePassword} className="w-full" size="lg">...</Button>`
- **Changelog**: Added a technical `changelog.md` and a user-facing `/changelog` page to document project updates.

### Changed
- **UI & Theming**: Completely overhauled the application's design.
  - Implemented multiple color palettes, settling on a modern, darker grey gradient background with blue accents.
  - Wrapped the main content in a "Vista-style" card with rounded corners and a subtle shadow for a layered look.
  - File: `src/app/globals.css`, `src/app/page.tsx`
- **Password Output**: Increased the number of generated password options from three to four.
  - Path: `src/components/password-generator.tsx`
- **Header Styling**: Adjusted the main title `<h1>` to be smaller and the subtitle `<p>` to use a normal font weight for better visual hierarchy.
  - Path: `src/app/page.tsx`
- **Footer**: Updated the footer to include the current year and version number, with a link to the new changelog page.
  - Path: `src/app/page.tsx`

### Fixed
- **React Prop Warning**: Resolved a React warning "React does not recognize the `indicatorClassName` prop on a DOM element" by correctly destructuring and applying the prop within the `Progress` component.
  - Path: `src/components/ui/progress.tsx`
- **NPM Dependency Conflicts**: Fixed multiple `ERESOLVE` errors by updating incompatible dependencies. Specifically, `next-themes` and `recharts` were updated to versions compatible with React 19.
  - Path: `package.json`
