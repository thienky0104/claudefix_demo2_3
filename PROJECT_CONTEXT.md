# PROJECT CONTEXT — DEMO #2

## Master Template: Demo #1 → Controlled Transformation

> **IMPORTANT:** This project is a fork/duplicate of the completed Demo #1 salon website.
>
> Demo #1 is the **MASTER TEMPLATE**. Demo #2 is a controlled transformation of that template.
>
> Do NOT rebuild Demo #2 from scratch unless explicitly instructed.
>
> Preserve proven architecture, performance optimizations, responsive behavior, reusable components, and working animation systems wherever possible. Replace or modify only the parts that need to change for the new Demo #2 visual identity and content.

---

# 1. PROJECT PURPOSE

Demo #2 is a new one-page salon website created by duplicating the completed Demo #1 project.

The purpose is to create a **completely different salon website visually**, while retaining the strongest engineering decisions from Demo #1.

Demo #2 may have:

* a different salon name
* different location
* different brand identity
* different colors
* different typography
* different hero imagery
* different photography
* different videos
* different sections
* different section order
* different content
* different visual composition
* different animation choreography
* different navigation labels
* different CTA structure

However, the project should still benefit from the existing Demo #1 architecture.

The core principle is:

> **Change the design and content. Preserve good engineering.**

---

# 2. MASTER TEMPLATE RULE

Demo #1 is the technical master template.

When implementing Demo #2, always ask:

1. Can an existing Demo #1 component be reused?
2. Can the existing component be adapted instead of rebuilt?
3. Can existing animation infrastructure be preserved?
4. Can existing responsive behavior be preserved?
5. Can existing performance optimizations be preserved?

Only replace a system when the new design genuinely requires a different implementation.

Do NOT rewrite working systems merely because the visual design is changing.

---

# 3. CURRENT DEMO #1 ARCHITECTURE

The actual master-template application currently consists of:

```text
App
│
├── Nav
├── Hero
├── VideoShowcase
│   ├── Embla Carousel
│   ├── CarouselControls
│   └── VideoCard
├── HairGallery          (lazy-loaded)
├── ServicesPricing      (lazy-loaded)
├── Stylists             (lazy-loaded)
├── BookingCTA           (lazy-loaded)
├── Reviews              (lazy-loaded)
├── MapSection           (lazy-loaded)
├── Footer               (lazy-loaded)
├── FloatingContact
└── IntroOverlay
```

The main entry point is:

```text
src/main.tsx
```

The main application composition and intro animation orchestration are in:

```text
src/App.tsx
```

---

# 4. TECHNOLOGY STACK

Current project stack:

* React 19
* TypeScript
* Vite 8
* Tailwind CSS v4
* GSAP 3.15
* Embla Carousel
* Lucide React
* Cloudinary for image/video assets
* Google Fonts

The project uses Tailwind CSS v4 through the Vite plugin and CSS-based theme definitions.

There is currently a Supabase dependency in `package.json`, but the current website is a presentational frontend and does not rely on Supabase for its current functionality.

Do not introduce backend infrastructure unless explicitly requested.

---

# 5. IMPORTANT FILE STRUCTURE

Current important files:

```text
project/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.app.json
├── PROJECT_CONTEXT.md
│
├── public/
│   └── favicon.svg
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    │
    ├── components/
    │   ├── BookingCTA.tsx
    │   ├── CarouselControls.tsx
    │   ├── FloatingContact.tsx
    │   ├── Footer.tsx
    │   ├── HairGallery.tsx
    │   ├── Hero.tsx
    │   ├── IntroOverlay.tsx
    │   ├── MapSection.tsx
    │   ├── Nav.tsx
    │   ├── Reviews.tsx
    │   ├── ServicesPricing.tsx
    │   ├── Stylists.tsx
    │   ├── VideoCard.tsx
    │   ├── VideoShowcase.tsx
    │   │
    │   └── ui/
    │       └── carousel.tsx
    │
    ├── data/
    │   └── videoData.ts
    │
    └── lib/
        └── utils.ts
```

Some files may be removed, replaced, or added during Demo #2 development.

Do not preserve unnecessary Demo #1 content merely for the sake of preserving files.

---

# 6. APP.TSX — IMPORTANT ARCHITECTURE

`App.tsx` is not simply a static list of sections.

It currently handles the global introductory animation orchestration.

Important responsibilities include:

* rendering the main page
* mounting the Hero immediately
* mounting the IntroOverlay
* controlling the master GSAP intro timeline
* coordinating Hero content and navigation reveal
* controlling intro completion state
* revealing FloatingContact after the intro and first user interaction
* lazy-loading lower sections

The current lower sections use React lazy loading:

```tsx
const HairGallery = lazy(() => import('@/components/HairGallery'));
const ServicesPricing = lazy(() => import('@/components/ServicesPricing'));
const Stylists = lazy(() => import('@/components/Stylists'));
const BookingCTA = lazy(() => import('@/components/BookingCTA'));
const Reviews = lazy(() => import('@/components/Reviews'));
const MapSection = lazy(() => import('@/components/MapSection'));
const Footer = lazy(() => import('@/components/Footer'));
```

This lazy-loading strategy is part of the performance architecture.

### Demo #2 rule

Keep lazy loading for below-the-fold sections unless there is a specific technical reason to change it.

Do not convert all sections back into eagerly loaded components.

---

# 7. HERO ARCHITECTURE

The Hero is always mounted from the first render.

The hero image is NOT swapped in after the intro.

The IntroOverlay sits above the Hero and reveals the already-mounted Hero.

Current architecture:

```text
Hero
│
├── full-screen background image
├── dark image overlays
├── hero content stack
│   ├── title
│   ├── review badge
│   ├── description
│   └── CTA row
│
└── scroll indicator

IntroOverlay
└── animated portal/mask above Hero
```

The Hero currently uses a responsive-safe unified content stack.

The title, review badge, description, and CTA are arranged in a single vertical flex structure rather than several independently positioned blocks.

This was intentionally done to prevent collisions on:

* tablets
* tall phones
* narrow mobile screens
* unusual viewport ratios

### Demo #2 rule

If the new Hero design can use this stack architecture, preserve it.

Do not return to a collection of independently positioned absolute elements unless the new design genuinely requires it.

Responsive safety is more important than unnecessary positional complexity.

---

# 8. HERO INTRO ANIMATION

The current intro animation is controlled by **one master GSAP timeline in `App.tsx`**.

Do not replace this with a chain of React timers or `setTimeout()` calls.

The animation currently contains several synchronized phases.

Conceptually:

```text
Initial black/dark mask
        ↓
Hero title characters reveal
        ↓
small rectangular portal appears
        ↓
portal becomes clearly visible
        ↓
portal expands to fullscreen
        ↓
mask fades away
        ↓
Hero UI + Nav appear
        ↓
Scroll indicator appears
        ↓
Intro complete
```

The portal is synchronized to the actual title animation rather than simply waiting for the title animation to finish.

The current implementation identifies the `Đ` character in:

```text
Triệu
Tóc Đẹp
```

and starts the portal choreography while the title is still animating.

This creates an overlapping cinematic sequence.

### Demo #2 rule

The exact timing and choreography may be completely redesigned for Demo #2.

However:

* use a master GSAP timeline
* keep animation synchronization inside GSAP
* avoid `setTimeout()` chains
* avoid unnecessary React state-driven animation
* preserve cleanup through `gsap.context()`
* use imperative initial states to avoid first-frame flashes

If Demo #2 requires a different intro animation, modify the existing system rather than automatically rebuilding the animation architecture.

---

# 9. INTRO OVERLAY / PORTAL SYSTEM

`IntroOverlay.tsx` contains a single full-screen overlay.

It uses a CSS `clip-path` polygon with an even-odd fill rule to create a true rectangular hole.

It is NOT four separate animated panels.

Conceptually:

```text
┌─────────────────────────┐
│█████████████████████████│
│██████┌──────────┐███████│
│██████│  HERO    │███████│
│██████│  IMAGE   │███████│
│██████└──────────┘███████│
│█████████████████████████│
└─────────────────────────┘
```

The portal coordinates are controlled using:

```text
--hx1
--hy1
--hx2
--hy2
```

This system allows the portal to transition from:

```text
closed
→ small rectangle
→ larger rectangle
→ full viewport
→ overlay disappears
```

### Demo #2 rule

This portal/mask mechanism is a reusable system.

If Demo #2's intro can be achieved with this architecture, reuse it.

If the new design requires a fundamentally different mask, modify the system carefully rather than replacing the entire animation infrastructure without need.

---

# 10. HERO ANIMATION PERFORMANCE RULES

Animations should remain performance-conscious.

Prefer animating:

* `transform`
* `opacity`
* `clip-path`

Avoid animating layout properties such as:

* `width`
* `height`
* `top`
* `left`
* margins that cause layout recalculation

Avoid unnecessary:

* blur animations
* heavy filter animations
* box-shadow animations
* WebGL
* Three.js
* Canvas-based animation

Do not introduce GPU-heavy effects merely for visual decoration.

The project is intended to remain smooth on mobile as well as desktop.

---

# 11. NAVIGATION SYSTEM

`Nav.tsx` contains both desktop and mobile navigation behavior.

Desktop navigation includes scroll-direction behavior.

Conceptually:

```text
scroll down → navigation moves upward / hides
scroll up   → navigation returns
```

Mobile navigation uses:

```text
hamburger
→ fullscreen/mobile menu
→ close
```

The current navigation labels and destinations are Demo #1-specific and may be completely replaced.

### Demo #2 rule

Preserve the navigation mechanics where useful.

Change:

* logo/name
* labels
* anchor IDs
* CTA
* typography
* colors
* spacing
* visual design

as required by Demo #2.

Do not rebuild the mobile navigation from scratch unless the new design requires fundamentally different behavior.

---

# 12. VIDEO SYSTEM

The current video architecture is:

```text
VideoShowcase
│
├── Embla Carousel
│
├── CarouselControls
│
└── VideoCard
```

Video data is centralized in:

```text
src/data/videoData.ts
```

`VideoCard.tsx` uses viewport visibility detection so videos play only when sufficiently visible and pause when they are no longer sufficiently visible.

The current system is designed to avoid unnecessary simultaneous video playback.

### Demo #2 rule

This system should normally be reused.

When Demo #2 needs different videos:

1. replace the video data
2. replace titles/captions if necessary
3. adapt styling if necessary
4. preserve the playback logic

Do NOT rebuild the video player system simply because the videos are different.

---

# 13. VIDEO PERFORMANCE DECISION

The Demo #1 project contains approximately ten large video assets.

Previous optimization attempts caused problems with:

* card sizing
* carousel layout
* visual proportions
* implementation stability

and consumed significant development time.

Therefore:

> **Do not aggressively optimize or re-encode the video assets by default.**

Keep the existing video architecture and behavior.

Only revisit video optimization if Demo #2 produces a specific measurable performance problem that justifies the risk.

Do not trade a working layout for theoretical video optimization.

---

# 14. IMAGE / CLOUDINARY ARCHITECTURE

The project uses Cloudinary-hosted assets with responsive transformations.

Existing URLs may use transformations such as:

```text
f_auto
q_auto
q_auto:eco
dpr_auto
w_...
c_fill
ar_...
```

Different assets can use different transformation strategies depending on their purpose.

### Demo #2 rule

Do not globally rewrite every Cloudinary URL.

When replacing an image:

* use the appropriate Cloudinary transformation for that image
* preserve the existing delivery philosophy
* consider actual display size
* avoid serving unnecessarily large source files
* do not degrade hero quality just to save a small amount of bandwidth

The hero is a high-priority visual asset and should retain appropriate resolution and quality.

---

# 15. LOWER SECTION ARCHITECTURE

The following components are independent and reusable:

```text
HairGallery
ServicesPricing
Stylists
BookingCTA
Reviews
MapSection
Footer
```

They should be treated as reusable building blocks rather than automatically rebuilt.

However, Demo #2 is allowed to completely change their visual designs.

For each section, determine:

```text
REUSE
ADAPT
REPLACE
REMOVE
```

before making major changes.

---

# 16. HAIR GALLERY

`HairGallery.tsx` is the existing lookbook/gallery system.

It handles salon photography and responsive presentation.

For Demo #2:

* images can be completely replaced
* image order can change
* layout can be adapted
* section styling can change
* section can be removed if the new design does not require it

Reuse the underlying gallery mechanics whenever they still fit the new design.

---

# 17. SERVICES / PRICING

`ServicesPricing.tsx` is a reusable services presentation system.

Service information is structured as data rather than being treated as one giant hardcoded text block.

For Demo #2:

* service names will change
* pricing will change
* categories may change
* typography may change
* layout may change

Preserve the data-driven approach where practical.

Do not hardcode a large amount of new content directly into the JSX if the existing component architecture can remain data-driven.

---

# 18. STYLISTS

`Stylists.tsx` contains the stylist presentation system.

Demo #2 may replace:

* names
* roles
* photos
* descriptions
* layout
* number of stylists

Reuse the component architecture if the new section still presents team members.

---

# 19. REVIEWS

`Reviews.tsx` contains the review/testimonial presentation system.

Demo #2 may completely replace:

* review content
* customer names
* ratings
* visual style
* number of reviews

Do not preserve Demo #1 customer information in Demo #2 unless explicitly requested.

---

# 20. MAP / LOCATION

`MapSection.tsx` contains the current location/contact presentation system.

It includes more than a static address.

It contains location-oriented visual behavior and interaction.

Demo #2 may replace:

* location
* address
* map image
* contact information
* CTA
* visual design

If Demo #2 still needs a location section, adapt this component before considering a full rebuild.

---

# 21. BOOKING CTA

`BookingCTA.tsx` is the current booking conversion section.

Demo #2 may completely change:

* copy
* CTA
* colors
* layout
* imagery
* button destination

The underlying component can be reused if the new booking section has a similar purpose.

---

# 22. FLOATING CONTACT

`FloatingContact.tsx` contains the floating contact/social actions.

The current project uses external contact destinations such as:

* Zalo
* Messenger
* TikTok
* Google Maps

The widget is intentionally revealed after the introductory animation and the user's first interaction.

This behavior prevents the first-load screen from becoming visually crowded.

### Demo #2 rule

Reuse the delayed-reveal mechanism where appropriate.

Replace all Demo #1-specific contact destinations and labels.

Do not invent contact information.

---

# 23. FOOTER

`Footer.tsx` is a self-contained footer system.

Demo #2 may replace:

* salon name
* address
* phone
* social links
* navigation
* copyright
* visual styling

Keep the component architecture if the footer structure remains useful.

---

# 24. RESPONSIVE DESIGN

Responsive behavior is a major part of the master template.

Demo #1 has already been tested and adjusted for:

* desktop
* tablet
* mobile
* narrow mobile
* tall mobile
* unusual viewport proportions

The Hero in particular was deliberately changed to avoid collisions caused by independently positioned content blocks.

### Demo #2 rule

Do not assume desktop CSS will automatically work on mobile.

Every major visual change should consider:

```text
Desktop
Tablet
Mobile
Tall mobile
Narrow mobile
```

Avoid unnecessary device-specific hacks.

Prefer:

* flex/grid
* clamp()
* responsive Tailwind classes
* natural document flow
* scalable spacing
* responsive image sizing

over hardcoded coordinates.

---

# 25. PERFORMANCE ARCHITECTURE

Demo #1 achieved approximately **98 Lighthouse Performance on desktop** after optimization.

This performance level is a major asset of the master template.

Preserve the following wherever possible:

* lazy-loaded lower sections
* responsive Cloudinary assets
* async image decoding
* lazy loading for non-critical images
* viewport-aware video playback
* animation of transform/opacity/clip-path
* immediate hero mounting
* GSAP cleanup
* minimal unnecessary JavaScript
* no WebGL
* no unnecessary heavy libraries
* no unnecessary DOM duplication

### Critical rule

Do not sacrifice a proven performance architecture for a visual change unless the visual requirement genuinely demands it.

---

# 26. LIGHTHOUSE / PERFORMANCE PRIORITY

Performance matters, but optimization must be practical.

Do not spend large amounts of development time chasing tiny theoretical improvements if they risk breaking:

* layout
* animation
* responsiveness
* video cards
* image composition
* visual quality

The goal is:

> **High performance + stable design + reliable responsive behavior.**

Not:

> maximum theoretical optimization at any cost.

---

# 27. DESIGN IDENTITY FOR DEMO #2

Demo #2 will have a completely new visual identity.

Do NOT assume Demo #1's:

* colors
* typography
* spacing
* imagery
* copy
* visual hierarchy
* section order
* animation timing
* layout composition

must remain.

Those are design variables.

The technical architecture is what should be preserved first.

The new visual direction will be supplied separately during development.

---

# 28. USER-FACING LANGUAGE

Demo #2's actual user-facing language will be defined by the new salon/brand requirements.

When the new brand direction is provided, all visible website copy should be updated consistently.

Do not leave Demo #1 salon names, locations, descriptions, prices, reviews, phone numbers, social accounts, or other identifying content in Demo #2 by accident.

Until new content is provided, use clearly identifiable placeholders rather than silently inventing real business information.

---

# 29. SEO / METADATA

`index.html` contains the document metadata and social preview configuration.

When Demo #2 branding is established, update:

* `<title>`
* meta description
* favicon if required
* Open Graph title
* Open Graph description
* Open Graph image
* canonical information if needed
* language metadata

The final site should use Vietnamese metadata where appropriate for the Vietnamese audience.

Do not break `index.html` by accidentally placing HTML inside a `.tsx` file.

HTML belongs in:

```text
index.html
```

React/TypeScript belongs in:

```text
src/**/*.tsx
```

---

# 30. IMPORTANT FILE-SAFETY RULE

Never replace the contents of a `.tsx` component with an entire `index.html` document.

For example:

```text
<!doctype html>
<html>
...
```

belongs in:

```text
index.html
```

not:

```text
src/components/Hero.tsx
```

Keep file responsibilities clear.

---

# 31. ANIMATION IMPLEMENTATION RULES

For new Demo #2 animations:

Prefer:

```text
GSAP
CSS transforms
opacity
clip-path
CSS variables
IntersectionObserver
requestAnimationFrame only when genuinely needed
```

Avoid:

```text
setTimeout animation chains
excessive React state animation
layout-property animation
continuous expensive scroll handlers
unnecessary blur/filter effects
WebGL
Three.js
Canvas
```

Animations should feel intentional and should not compromise mobile performance.

---

# 32. COMPONENT DESIGN RULE

When modifying an existing component:

### First choice

Adapt the existing component.

### Second choice

Extract reusable logic from the existing component.

### Third choice

Create a new component if the new section is genuinely different.

### Last choice

Replace an existing system entirely.

Do not rebuild something that already works simply because the new visual design looks different.

---

# 33. DATA VS PRESENTATION

Whenever possible, keep content separate from presentation.

Examples:

```text
videoData.ts
```

for video content.

Similarly structured data should be used for:

* services
* stylists
* reviews
* gallery items
* navigation links

This makes Demo #2 transformation faster and safer.

---

# 34. DEMO #2 DEVELOPMENT WORKFLOW

Development should happen in controlled phases.

## Phase 1 — Audit

Before modifying code:

* inspect existing project
* identify reusable components
* identify components that need adaptation
* identify components that must be replaced
* identify components that can be removed
* understand the new design direction

Do not start rewriting the whole application immediately.

---

## Phase 2 — Global identity

Update only the foundations required for the new brand:

* fonts
* colors
* typography
* base background
* global spacing conventions
* basic design tokens

Do not redesign every section at this stage.

---

## Phase 3 — Hero

Build the new Hero using the existing architecture where possible.

Decide:

* new hero image
* layout
* typography
* CTA
* supporting content
* intro animation
* mask/portal behavior
* mobile composition

The Hero is the highest-priority visual section.

---

## Phase 4 — Navigation

Adapt the existing Nav to the new brand.

Preserve working:

* desktop behavior
* scroll behavior
* mobile menu mechanics

unless the new design explicitly requires otherwise.

---

## Phase 5 — Sections

Work section-by-section.

For each section, decide:

```text
REUSE
ADAPT
REPLACE
REMOVE
```

Do not modify unrelated sections at the same time.

---

## Phase 6 — Media

Replace:

* images
* videos
* gallery content
* stylist images
* review content

while preserving existing delivery and playback architecture wherever possible.

---

## Phase 7 — Mobile refinement

After desktop structure is stable:

* inspect tablet
* inspect mobile
* inspect tall mobile
* inspect narrow mobile

Fix the smallest necessary thing.

Do not introduce broad global CSS changes to solve a single component problem.

---

## Phase 8 — Animation polish

Only after the structural design works:

* refine entrance animations
* refine scroll animations
* refine hover behavior
* refine transitions
* refine timing

Do not use animation to compensate for incorrect layout.

---

## Phase 9 — Performance verification

After the design is stable:

* run production build
* inspect Lighthouse
* inspect image loading
* inspect video behavior
* inspect layout stability
* inspect mobile performance

Do not perform speculative optimization before the design is stable.

---

# 35. BOLT DEVELOPMENT RULES

This project is being developed with Bolt on a limited/free token budget.

Therefore, prompts should be precise and scoped.

Do NOT issue broad prompts such as:

> "Redesign the entire website."

Instead, use instructions such as:

> "Modify only the Hero component. Preserve the existing GSAP intro architecture, responsive stack, image-loading strategy, and all sections below the Hero. Replace the visual design with the supplied Demo #2 direction."

Every significant Bolt request should clearly state:

1. what to modify
2. what to preserve
3. what not to touch

---

# 36. MINIMIZE UNNECESSARY ITERATIONS

Before asking Bolt to make a change, understand the existing implementation.

Avoid speculative changes.

Avoid changing several unrelated systems simultaneously.

Avoid rewriting a component if only its data needs to change.

Avoid replacing working CSS architecture when only colors/typography need to change.

Avoid touching video infrastructure unless necessary.

Avoid touching performance infrastructure unless necessary.

---

# 37. GOLDEN RULE FOR BOLT

When modifying Demo #2:

> **PRESERVE WHAT WORKS. CHANGE ONLY WHAT THE NEW DESIGN REQUIRES.**

If an existing Demo #1 system already solves the technical problem, reuse it.

Do not recreate it from scratch.

---

# 38. REUSE / MODIFY / REPLACE MAP

Use this as the default starting point.

| System                    | Default action        |
| ------------------------- | --------------------- |
| React/Vite architecture   | REUSE                 |
| TypeScript architecture   | REUSE                 |
| Tailwind v4               | REUSE                 |
| GSAP                      | REUSE                 |
| GSAP cleanup/context      | REUSE                 |
| Lazy loading              | REUSE                 |
| Cloudinary strategy       | REUSE                 |
| Video playback logic      | REUSE                 |
| Embla carousel            | REUSE if needed       |
| VideoCard                 | REUSE / ADAPT         |
| VideoShowcase             | ADAPT                 |
| Nav mechanics             | REUSE / ADAPT         |
| Mobile menu               | REUSE / ADAPT         |
| FloatingContact behavior  | REUSE / ADAPT         |
| Hero architecture         | REUSE / ADAPT         |
| IntroOverlay mechanism    | REUSE / ADAPT         |
| Hero visual design        | REPLACE               |
| Hero image                | REPLACE               |
| Hero copy                 | REPLACE               |
| Colors                    | REPLACE               |
| Typography                | REPLACE               |
| Gallery content           | REPLACE               |
| Services content          | REPLACE               |
| Stylist content           | REPLACE               |
| Reviews                   | REPLACE               |
| Location/contact data     | REPLACE               |
| Footer content            | REPLACE               |
| Section order             | MODIFY                |
| Individual section layout | MODIFY / REPLACE      |
| Performance optimizations | KEEP                  |
| Responsive foundations    | KEEP unless necessary |

---

# 39. WHAT MUST NOT HAPPEN

Do NOT:

* rebuild the entire project from scratch
* remove working lazy loading without reason
* remove the existing video playback system without reason
* replace GSAP with random CSS animations without reason
* add WebGL/Three.js/Canvas for decorative effects
* introduce unnecessary dependencies
* globally rewrite Cloudinary URLs without understanding their purpose
* aggressively re-encode all videos
* sacrifice mobile layout for desktop aesthetics
* replace responsive flow with excessive absolute positioning
* use `setTimeout()` chains for synchronized intro animation
* place HTML documents inside TSX files
* modify unrelated sections when working on one section
* invent real salon contact information
* leave Demo #1-specific business information accidentally inside Demo #2
* rewrite proven performance architecture simply because the visual design changed

---

# 40. CURRENT MASTER TEMPLATE STATUS

Demo #1 is considered a stable reference implementation.

Known strengths that should be preserved:

* cinematic Hero intro
* synchronized GSAP timeline
* portal/mask reveal system
* responsive Hero stack
* responsive navigation
* mobile navigation
* viewport-aware video playback
* Embla carousel
* lazy-loaded lower sections
* Cloudinary asset delivery
* reusable section components
* data-driven content structures
* floating contact reveal
* production build stability
* strong desktop Lighthouse performance

The exact Demo #1 visual identity is NOT required for Demo #2.

The engineering quality is.

---

# 41. HOW TO HANDLE FUTURE REQUESTS

When a new request is made, first determine whether it affects:

```text
CONTENT
DESIGN
LAYOUT
ANIMATION
RESPONSIVENESS
PERFORMANCE
ARCHITECTURE
```

Then modify the smallest appropriate scope.

Example:

If asked:

> "Change the hero headline."

Only modify Hero content.

If asked:

> "Change the hero animation."

Modify Hero/IntroOverlay/App animation coordination as needed, but preserve the rest of the page.

If asked:

> "Replace the ten videos."

Modify video data/assets, not the playback architecture.

If asked:

> "Create a completely different gallery."

Determine whether HairGallery can be adapted before replacing it.

If asked:

> "Make the entire site feel more minimal."

Do not immediately rewrite every component. Establish the new design system first, then update sections systematically.

---

# 42. DEMO #2 DESIGN INFORMATION

The following information will be supplied during development and should be treated as the current source of truth once provided:

```text
Brand:
[TO BE PROVIDED]

Salon name:
[TO BE PROVIDED]

Location:
[TO BE PROVIDED]

Target audience:
[TO BE PROVIDED]

Visual direction:
[TO BE PROVIDED]

Color palette:
[TO BE PROVIDED]

Typography:
[TO BE PROVIDED]

Hero design:
[TO BE PROVIDED]

Hero animation:
[TO BE PROVIDED]

Section structure:
[TO BE PROVIDED]

Images:
[TO BE PROVIDED]

Videos:
[TO BE PROVIDED]

Contact information:
[TO BE PROVIDED]

Social links:
[TO BE PROVIDED]
```

Do not invent these values before they are provided.

---

# 43. FINAL PROJECT PRINCIPLE

This is NOT a greenfield project.

It is:

```text
DEMO #1
   │
   │  proven architecture
   │  proven performance
   │  proven responsive behavior
   │  proven reusable systems
   ↓
DEMO #2
   │
   ├── new brand
   ├── new visuals
   ├── new content
   ├── new assets
   ├── new layout
   └── new animation direction
```

The goal is to get the creative freedom of a completely new website without paying the engineering cost of rebuilding an already successful foundation.

> **Demo #1 is the MASTER TEMPLATE.**
>
> **Demo #2 is a controlled transformation of that template.**
>
> **Reuse first. Adapt second. Replace only when necessary.**
>
> **Preserve performance and responsive behavior.**
>
> **Minimize Bolt iterations and token usage.**
