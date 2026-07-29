# Portfolio 26-8 — Theme Plan

Status: Planning only
Implementation: Not started
Portfolio source files: Unchanged

## Main colors

| Role | Color | Value |
| --- | --- | --- |
| Primary | Existing portfolio cyan | `#1EBBD7` |
| Secondary | Warm ivory | `#F4F1DE` |

## Direction

The updated portfolio will preserve cyan as its recognizable main color. Warm
ivory will replace the current purple/pink emphasis in newly designed Portfolio
26-8 sections and components.

The intended character is:

- Dark, space-inspired foundation retained from the original portfolio.
- Cyan used for identity, active elements, links, and technical highlights.
- Warm ivory used for contrast, selected borders, supporting text, subtle
  surfaces, and calm highlights.
- Cyan-to-ivory combinations used selectively for gradients and emphasized
  borders.
- Existing legacy sections and their original colors remain unchanged unless a
  future change is reviewed and approved.

## Proposed planning tokens

These are reference values only. They are not implemented in the portfolio.

```css
--portfolio-26-primary: #1EBBD7;
--portfolio-26-secondary: #F4F1DE;
```

## Preservation rules

1. Build Portfolio 26-8 work in new components rather than rewriting legacy
   components.
2. Preserve old components even when a new version replaces them in the rendered
   page.
3. Obtain approval before changing shared files, imports, navigation, global
   styles, or existing components.
4. Treat removal as disabling or unrendering by default.
5. Require explicit approval before permanently deleting legacy files or assets.
