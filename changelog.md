# Changelog

All notable changes to this project will be documented in this file.

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
