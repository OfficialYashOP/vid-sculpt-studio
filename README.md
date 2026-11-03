# Cinematic AI Studio

# Lovable Prompt — AI Video Generalist Portfolio (Yash Pandey)

Copy everything below into Lovable as your starting prompt.

---

Build a premium, cinematic personal portfolio website for **Yash Pandey**, an **AI Video Generalist** who creates ads, short films, and UGC content using the latest AI video tools. The site should feel like a high-end creative studio's website — dark, moody, film-grade, not a generic template.

## Overall Vibe & Design Direction
- Dark cinematic theme: near-black background (#0A0A0B), with a single accent color used sparingly — electric amber/gold (#D4A94E) or neon cyan (#00E5FF), pick one and use it consistently for CTAs, highlights, and hover states.
- Typography: a bold, tight-tracking display font for headlines (like a movie poster title) paired with a clean, modern sans-serif for body text.
- Generous whitespace, large hero typography, subtle grain/noise texture overlay for a "film" feel.
- Smooth scroll-triggered fade/slide-up animations on every section (use Framer Motion style easing, nothing bouncy or cheap).
- Glassmorphism cards (frosted glass, subtle border, soft shadow) for project and skill cards.
- Fully responsive, mobile-first, with buttery smooth transitions.
- No stock "AI generic" look — this must feel bespoke and cinematic, like a portfolio for someone who edits films for a living.

## Site Structure

### 1. Hero Section (Full viewport)
- Large headline: "AI Video Generalist" or "I Turn Ideas Into Cinematic AI Videos"
- Subheadline: 7+ years creating video content, now building ads, short films & UGC with cutting-edge AI tools.
- Background: subtle looping video/gradient mesh or animated particles suggesting motion/film reels — avoid literal stock footage, use abstract animated gradients instead.
- Primary CTA button: "View My Work" (scrolls to Projects)
- Secondary CTA: "Let's Talk" (scrolls to Contact)
- Small scroll-down indicator animation.

### 2. About Section
- Short bio: AI-driven video creator and editor with 7+ years of experience, specializing in AI video tools, image-to-video models, and storytelling for marketing and cinematic content.
- Include a portrait photo placeholder (rounded, with a subtle glow/border in accent color).
- Add 3–4 quick stat cards: "7+ Years Experience", "12-Min AI Short Film", "Multiple AI Tools Mastered", "Client Projects Delivered"

### 3. Services / What I Do
Grid of 4–6 glass cards, each with an icon and short description:
- AI Short Films & Cinematic Content
- UGC & Marketing Ad Videos
- Image-to-Video Generation
- Thumbnail & Visual Design
- Sound Design
- Content Strategy & Audience Growth

### 4. Featured Projects (Showcase Grid)
This is the visual centerpiece of the site — build it as a masonry or bento-grid layout with hover-zoom video thumbnails (placeholder video/image blocks the user will replace with real footage later). Make the flagship short film project bigger/featured (spans 2 columns) and the rest as a grid below it.

**Flagship Project (large featured card):**
- **"12-Minute AI Short Film"** — a full cinematic short film adaptation, generated entirely using Seedance 2.0, edited for pacing, storytelling, and sound design. Tags: "Seedance 2.0", "Literary Adaptation", "Cinematic Short Film"

**Project Grid (standard cards):**
- **"Pixar-Style Hair Care Ads"** (2 videos) — stylized 3D-animation-inspired product ads for a hair care brand, generated with Seedance 2.0. Tags: "Seedance 2.0", "Pixar Style", "Product Ad"
- **"UGC-Style Reel"** — an authentic, creator-style short-form ad built to feel native to social feeds, generated with Seedance 2.0. Tags: "Seedance 2.0", "UGC", "Social Ad"
- **"Professional Coffee Ad"** — a polished, premium-look product commercial for a coffee brand, generated with Kling 3.0. Tags: "Kling 3.0", "Product Commercial"
- **"Panda Animation Series"** (2 videos) — short animated videos featuring a panda character, generated with Veo 3.1. Tags: "Veo 3.1", "Character Animation"
- **"Candy Montage Ad"** — a clean, visually satisfying product montage spotlighting candy, built for quick social consumption. Tags: "AI Video", "Product Montage"
- **"AI Influencer Creation"** (2 clients) — fully AI-generated virtual influencer personas built and delivered for two separate clients, including consistent character design and video content. Tags: "AI Influencer", "Character Design", "Client Work"

Each project card should show: title, tool/tag pills, a one-line hook description, and a hover state that plays/previews the video (or shows a play icon overlay). Group by a filter bar at the top of the section — filters: "All", "Short Film", "Product Ads", "UGC", "Animation", "AI Influencers" — so visitors can filter the grid by category.

### 5. Skills / Tools Section
Organized into categories with animated tag/pill layout:
- **Video Editing:** Adobe Premiere Pro, Wondershare Filmora, Sound Design
- **AI Video Tools:** Runway ML, Pika, Kling AI, Google Veo, Seedance, Image-to-Video Models
- **AI Image Tools:** Midjourney, GPT Image 2, Nano Banana Pro
- **Design:** Photoshop, Thumbnail Design, Visual Composition
- **Strategy:** Audience Retention, Trend Analysis, Content Strategy, Creative Direction

### 6. Experience Timeline
Vertical timeline component:
- **AI Video Creator & Editor — Freelance / Independent** | 2018 – Present
  - Produced long-form and short-form video content using advanced editing and AI tools
  - Delivered AI-generated short films, ads, UGC content, and AI influencer builds for clients
  - Designed thumbnails and visuals, optimized content strategy for engagement and performance

### 7. Education (small, minimal section)
- B.Tech, Computer Science and Engineering — Lovely Professional University, Punjab (2022–Present)
- 12th Science — Green Field Sr Sec School, Jaipur (80%)

### 8. Contact / CTA Section
- Bold closing headline: "Let's Create Something Cinematic Together"
- Contact card with Email (pandey97828@gmail.com), Phone (+91-9461571272), LinkedIn (linkedin.com/in/yashpandeyofficial007)
- A simple contact form (Name, Email, Message) with a styled submit button
- Social icons row (LinkedIn, Email)

### 9. Footer
- Minimal footer with name, tagline ("AI Video Generalist"), copyright, and quick nav links.

## Technical Notes
- Use React + Tailwind CSS.
- Use smooth scroll navigation with a fixed/sticky transparent-to-solid navbar on scroll.
- Add subtle cursor-follow or hover-glow micro-interactions on buttons and cards.
- Make all sections scroll-reveal animated (staggered fade + slight upward motion).
- Keep the color palette restricted to background black/near-black, off-white text, and one accent color — no rainbow gradients.
- Ensure it looks premium on both desktop and mobile — no cramped mobile stacking, keep spacing generous.

Build this as a single-page scrolling portfolio with anchor navigation (Home, About, Work, Skills, Experience, Contact).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://vid-sculpt-studio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/08dc9d5f-e05b-4cad-9547-a44216bcb8c1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
