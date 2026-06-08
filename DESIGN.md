---
name: Mtalii Terra
colors:
  surface: '#fff8f3'
  surface-dim: '#edd7b8'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff2e2'
  surface-container: '#ffebd0'
  surface-container-high: '#fbe5c6'
  surface-container-highest: '#f6dfc0'
  on-surface: '#251a07'
  on-surface-variant: '#44483f'
  inverse-surface: '#3b2e19'
  inverse-on-surface: '#ffeed9'
  outline: '#75786e'
  outline-variant: '#c5c8bc'
  surface-tint: '#526440'
  primary: '#344525'
  on-primary: '#ffffff'
  primary-container: '#4b5d3a'
  on-primary-container: '#c0d5a9'
  inverse-primary: '#b9cda2'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#563a1d'
  on-tertiary: '#ffffff'
  tertiary-container: '#705132'
  on-tertiary-container: '#f0c69e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4eabc'
  primary-fixed-dim: '#b9cda2'
  on-primary-fixed: '#101f04'
  on-primary-fixed-variant: '#3b4c2b'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#e9bf98'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#5e4123'
  background: '#fff8f3'
  on-background: '#251a07'
  surface-variant: '#f6dfc0'
  forest-deep: '#2F4F2F'
  warm-stone: '#B8A48C'
  sand-light: '#F2E8DA'
  charcoal-text: '#1A1C18'
typography:
  display-lg:
    fontFamily: manrope
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: plusJakartaSans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: plusJakartaSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: plusJakartaSans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: plusJakartaSans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style
The design system embodies "Modern Safari Luxury"—a sophisticated synthesis of high-end travel and raw natural immersion. The brand personality is adventurous yet composed, catering to travelers who seek the thrill of the wilderness without sacrificing refined aesthetics.

The visual style is a blend of **Minimalism** and **Modern Corporate**, utilizing expansive white space to allow high-definition landscape photography to breathe. The aesthetic relies on grounded, earthy tones and a structured hierarchy to convey reliability, expertise, and exclusivity.

## Colors
The palette is rooted in the natural landscape of East Africa. 
- **Primary (Military Green):** Used for key brand actions, success states, and primary navigation elements. It represents the flora and the professional heritage of safari guiding.
- **Secondary (Pure White):** The core canvas color. It provides a clean, premium backdrop that allows the earthy accents to stand out.
- **Accent (Earth Brown):** Reserved for interactive transitions, hover states, and callouts to mountains or paths.
- **Neutrals (Sand & Stone):** Used for secondary backgrounds, containers, and subtle UI borders to soften the interface compared to standard grays.

## Typography
The system uses a pairing of two modern sans-serifs to maintain a clean, "Apple-esque" technical precision while remaining warm.
- **Manrope** is used for headings to provide a structured, geometric authority. It feels modern and architectural.
- **Plus Jakarta Sans** is used for body copy and labels. Its slightly softer terminals and open apertures ensure high legibility in travel itineraries and long-form descriptions.
- **Hierarchy:** Maintain large contrast between display headings and body text to create a sense of luxury and editorial scale.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain a contained, premium feel, switching to a fluid model for mobile.
- **Grid:** A 12-column grid for desktop with wide 64px margins to emphasize exclusivity.
- **Vertical Rhythm:** Large vertical gaps (Section Gaps) are used between major content blocks to prevent the UI from feeling cluttered.
- **Photography:** Large-scale imagery should often break the grid or bleed to the edges to create an immersive experience.

## Elevation & Depth
This design system avoids heavy shadows in favor of **Tonal Layers** and **Ambient Shadows**.
- **Surfaces:** Use `sand-light` or `warm-stone` at 5% opacity for background containers to differentiate from the `Pure White` base.
- **Shadows:** When used for cards, shadows are extremely diffused (e.g., `Y: 8px, Blur: 24px, Spread: -4px`) with a tint of `Military Green` at 8% opacity to maintain color harmony.
- **Glassmorphism:** Subtle backdrop blurs (12px) are used on navigation bars and image overlays to maintain context while ensuring text legibility.

## Shapes
The shape language is "Rounded-Organic." Elements use a base radius of 16px to 24px for large cards to echo the softened edges of weathered stones and natural landscapes. 
- **Standard UI:** 8px (Buttons, Inputs).
- **Cards/Images:** 24px for a distinct, premium feel.
- **Interactive:** Soft, pill-shaped tags for "Adventure Type" or "Price Range."

## Components
- **Buttons:**
    - *Primary:* `Military Green` background, `Pure White` text. Hover state shifts background to `Forest Deep`.
    - *Secondary:* Transparent background, 1.5px `Military Green` border. Hover state fills with `Sand Light`.
    - *Tertiary:* `Earth Brown` text with a subtle underline, used for "Read More."
- **Cards:** White backgrounds with 24px corner radius and soft ambient shadows. Images within cards should have a subtle zoom-on-hover effect.
- **Input Fields:** Minimalist style. `Warm Stone` 1px border that thickens and changes to `Military Green` on focus. Labels use the `Label-md` style.
- **Chips/Badges:** Small, rounded elements with `Sand Light` backgrounds and `Military Green` text for category tags (e.g., "Safari," "Trekking").
- **Transitions:** Use `cubic-bezier(0.4, 0, 0.2, 1)` for all hover transitions. Elements should fade and slide upward 4px on entry to create a graceful, "lifting" animation feel.
- **Image Overlays:** Use a subtle gradient overlay (from transparent to 40% `Forest Deep`) at the bottom of hero images to ensure white typography remains legible.