# Design Brief

## Direction
Gritty esports tournament platform — brutalist gaming UI with high-contrast dark theme and electric accents.

## Tone
Extreme brutalism with gaming edge — confident, uncompromising, competitive. Pure function over decoration, sharp geometric clarity, no warmth.

## Differentiation
Electric cyan primary + vibrant orange/lime accent on pure black background creates unmistakable gaming tournament visual language; sharp 0-2px corners emphasize precision and competitive edge.

## Color Palette

| Token      | OKLCH       | Role                           |
| ---------- | ----------- | ------------------------------ |
| background | 0.12 0 0    | Pure black, app foundation     |
| foreground | 0.9 0 0     | Bright white, maximum contrast |
| card       | 0.16 0 0    | Slightly lifted card surfaces  |
| primary    | 0.68 0.24 195 | Electric cyan, CTAs & active   |
| accent     | 0.72 0.22 65  | Vibrant orange/lime highlights |
| border     | 0.25 0 0    | Thin sharp dividers            |
| destructive| 0.55 0.22 25| Red alerts & rejections        |

## Typography
- Display: Space Grotesk — geometric, tech-forward gaming-native feel
- Body: DM Sans — clean, readable, modern esports standard
- Scale: hero `text-5xl md:text-7xl font-bold`, section `text-3xl md:text-5xl`, label `text-sm uppercase font-semibold`, body `text-base`

## Elevation & Depth
No decorative shadows; structure through geometric contrast, sharp borders, and layered background greys (0.12 / 0.16 / 0.2).

## Structural Zones

| Zone    | Background | Border       | Notes                               |
| ------- | ---------- | ------------ | ----------------------------------- |
| Header  | 0.16       | 0.25 bottom  | Navigation, logo, user profile     |
| Content | 0.12       | —            | Match cards, forms, tables          |
| Footer  | 0.16       | 0.25 top     | Links, copyright, support          |
| Sidebar | 0.16       | 0.25 right   | Admin menu or drawer nav           |

## Spacing & Rhythm
Compact, dense information hierarchy via spacing (8px base unit: sm 8px, md 16px, lg 24px), no breathing room — esports UI prioritizes scan speed over comfort.

## Component Patterns
- Buttons: Sharp corners, cyan primary + orange accent variants, white text, border-only secondary style
- Cards: 0.16 bg, 0.25 border, no shadow, compact padding
- Badges: Full-width accent highlights, label text, icon + text for match status/player count
- Forms: 0.25 input borders, cyan focus ring, white placeholder text

## Motion
- Entrance: Stagger 50ms per card, linear fade-in (0.2s)
- Hover: Fast scale (1.02x) + cyan glow on interactive elements (0.15s)
- Decorative: Pulse animation on "live" match indicators (1.5s)

## Constraints
- No gradients, no opacity, no soft shadows — pure flat geometric design
- Max 2-point border thickness, never rounded > 2px
- High contrast enforced: all text >= 4.5:1 WCAG AA+
- No decorative illustrations or background images

## Signature Detail
Electric cyan on pure black creates unmistakable gaming tournament visual language; sharpness emphasizes competition and precision.
