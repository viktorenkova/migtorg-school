# AGENTS.md

## Project

Migtorg PRO is a landing page for a free automotive auction school.

Current repository stack:

- Vite + React 18 + TypeScript.
- Tailwind CSS + plain CSS in `src/styles.css`.
- Framer Motion is available for controlled motion.
- `lucide-react` is available for icons.
- Main app entry: `src/main.tsx`.
- Page composition: `src/App.tsx`.
- Section components: `src/sections.tsx`.
- Shared UI components: `src/components/ui.tsx`.
- Header component: `src/components/Header.tsx`.
- Content arrays: `src/data.ts`.
- Navigation/assets constants: `src/constants.ts`.
- Root `styles.css` currently imports `src/styles.css`.
- Visual contract: `DESIGN_SYSTEM.md`.

Goal: develop the landing page through a professional UX/UI implementation process, without losing structure, content, responsiveness, or visual consistency.

This file defines how Codex must work in this repository.

## Core Principle

Do not generate or rewrite the whole landing page in one pass.

Work iteratively:

1. Understand the current state.
2. Read the design contract.
3. Implement one section, one component, or one clearly scoped task.
4. Check desktop, tablet, and mobile behavior.
5. Report changes, checks, risks, and follow-up tasks.

Visual quality and consistency are more important than speed.

## Required Reading Before Any UI Task

Before changing UI code, always read:

1. `MASTER_BRIEF.md`, if it exists.
2. `DESIGN_SYSTEM.md`, if it exists.
3. `QA_CHECKLIST.md`, if it exists.
4. The files directly related to the task.

In the current repository, `DESIGN_SYSTEM.md` exists and is the source of visual truth for final visual implementation.

If `DESIGN_SYSTEM.md` is missing in a future branch, do not invent a final visual style. Ask to create the design contract first, or create it as a separate task.

## Existing Commands

Use only commands that exist in `package.json`.

Available commands:

```bash
npm.cmd run dev
npm.cmd run build
npm.cmd run preview
```

Current command gaps:

- No `lint` command exists.
- No `test` command exists.

If linting or automated tests are needed, add them only as a separate explicit task.

## Non-Negotiable Visual Rules

When the final visual direction is being implemented:

- Do not create a generic SaaS landing page.
- Do not create an infobusiness aesthetic.
- Do not use random stock business imagery.
- Do not brighten the page into a white or light theme unless explicitly requested.
- Do not replace the Migtorg PRO visual direction with Bootstrap-like or template-like UI.
- Do not use green except for profit, ROI, positive metrics, or success states.
- Do not use red randomly; red is for CTA, warning, auction/action accents, and brand emphasis.
- Do not mix unrelated visual styles across sections.
- Do not leave sections visually disconnected from `DESIGN_SYSTEM.md`.
- Do not add decorative elements that are not justified by the design contract.
- Do not add a new final design direction inside this file.

## Visual Reset Mode

If the task is a visual reset:

- Do not make the project look finished.
- Do not invent a new style.
- Remove decorative visual layers.
- Preserve semantic structure, content, section ids, navigation anchors, forms, and basic responsiveness.
- Produce a neutral foundation for future redesign.

## Implementation Mode

If the task is section implementation:

- Work only on the requested section or component.
- Do not rewrite unrelated sections.
- Do not change content unless the task explicitly asks for copy changes.
- Preserve ids used for navigation.
- Preserve accessibility basics: semantic tags, labels, alt text, focus states.
- Keep components reusable where practical.
- Avoid overengineering.

For this repository, section work usually touches one or more of:

- `src/sections.tsx`
- `src/components/ui.tsx`
- `src/components/Header.tsx`
- `src/data.ts`
- `src/constants.ts`
- `src/styles.css`

## Design System Compliance

When `DESIGN_SYSTEM.md` exists, all UI decisions must follow it:

- colors;
- typography;
- spacing;
- grid;
- container width;
- border radius;
- cards;
- buttons;
- backgrounds;
- glow effects;
- responsive behavior;
- motion behavior;
- visual acceptance criteria.

If the design system lacks a rule, choose the simplest consistent solution and mention the decision in the final report.

## Responsive Requirements

Every UI task must consider:

- desktop;
- tablet;
- mobile.

Check for:

- no horizontal scroll;
- readable headings;
- usable buttons;
- cards stacking correctly;
- forms fitting the viewport;
- navigation not covering content;
- section anchors still landing in a usable position.

Preferred manual viewport checks:

- desktop: `1440x900`;
- tablet: `768x1024`;
- mobile: `390x844`.

## Code Quality

- Keep code clean and readable.
- Remove unused CSS/classes after refactors.
- Do not leave TODO comments.
- Do not leave dead assets or unused imports if they are clearly obsolete.
- Prefer simple, maintainable CSS/HTML/React over clever abstractions.
- Do not introduce UI libraries unless explicitly requested.
- Keep Russian content intact unless the task explicitly asks for copy changes.
- Do not rename section ids or navigation anchors unless the task explicitly requires it.
- Keep file edits scoped to the task.

## Assets

Existing assets live in:

- `assets/images/`
- `assets/docs/`

Use existing assets when they match the task and the design contract.

Do not add visual dependencies on an image if the task is a visual reset. For final section implementation, image usage must be intentional and consistent with `DESIGN_SYSTEM.md`.

## Verification

After changes, run available project checks.

Use only commands that exist in `package.json`.

At minimum:

1. Run `npm.cmd run build` for TypeScript and production build verification when code changes affect React, TypeScript, CSS, Tailwind, or Vite config.
2. Use `npm.cmd run dev` when browser verification is needed.
3. Use `npm.cmd run preview` only when production preview is specifically useful.

If a requested verification needs lint or tests, state clearly that the repo currently has no `lint` or `test` script and that adding them should be a separate task.

Browser checks should verify:

- project starts or builds if a command exists;
- no obvious console/runtime errors;
- no horizontal scroll;
- desktop/tablet/mobile layouts are considered;
- forms and interactive components still work.

## Final Report Format

After completing a task, report:

1. What changed.
2. Files changed.
3. What was preserved.
4. What checks were run.
5. Any risks or follow-up tasks.

Keep the report concise and factual.

## Current Process State

The project currently has a visual reset foundation and a separate `DESIGN_SYSTEM.md` for the intended final visual direction. Future final-design implementation should proceed section by section against `DESIGN_SYSTEM.md`, not by restoring an old visual layer wholesale.
