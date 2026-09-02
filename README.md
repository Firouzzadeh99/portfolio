<div align="center">

# Masoumeh Firouzzadeh — Portfolio

A modern, fast, and animated personal portfolio built with Next.js 16, TypeScript, and a rich, animated UI — deployed on Cloudflare's global edge network via OpenNext.

 

### Required Cloudflare secrets

Set this once via Wrangler:

```bash
npx wrangler secret put OPENROUTER_API_KEY
```

### Preview locally on the Workers runtime

```bash
npm run preview
```

---

## 📁 Project Structure

```
web-portfolio/
├── public/                      # Static assets
│   ├── lottie/                  # Lottie animation files
│   ├── projects/                # Project showcase screenshots
│   ├── resume/                  # Resume preview images
│   └── firouzzadeh-resume.pdf
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/
│   │   │   └── chat/route.ts    # AI chat endpoint
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── assets/                  # Images & icons used in components
│   │   └── images/
│   │
│   ├── components/
│   │   ├── home/                # Page sections (hero, about, skills, projects, experience, contact)
│   │   ├── layout/               # Navbar, scroll-to-top, chatbot widget, intro overlay
│   │   ├── icon/                  # Custom icon & Lottie components
│   │   └── ui/                    # Reusable UI primitives (buttons, cards, tooltip, theme toggle...)
│   │
│   ├── data/                     # Static content (about, projects, skills, experience, contact)
│   ├── hooks/                     # Custom hooks (useGitHubStars, useCountUp, useActiveSection)
│   ├── lib/                        # Shared utilities
│   └── types/                       # Shared TypeScript types
│
├── open-next.config.ts            # OpenNext (Cloudflare) configuration
├── wrangler.jsonc                  # Cloudflare Worker configuration
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 📬 Contact

- **Email:** mfirouzzadeh99@gmail.com
- **LinkedIn:** [in/masoumeh-firouzzadeh-firoozjah-175823277](https://www.linkedin.com/in/masoumeh-firouzzadeh-firoozjah-175823277/)
- **GitHub:** [github.com/Firouzzadeh99](https://github.com/Firouzzadeh99)
- **Telegram:** [t.me/mfirouzzadeh](https://t.me/mfirouzzadeh)

---

## 📄 License

This project is personal portfolio source code. Feel free to use it as
inspiration, but please don't republish it as-is under your own name.
