<div align="center">

# 🤖 PromptForge

### Discover, Create & Share AI-Powered Prompts

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth-4-purple?style=for-the-badge)](https://next-auth.js.org/)

</div>

---

## 📖 Overview

**PromptForge** is a full-stack, open-source AI prompt sharing platform built with the modern Next.js 14 App Router. It enables users to discover, create, and share creative AI prompts with a community of AI enthusiasts — all backed by Google OAuth authentication and a persistent MongoDB database.

> *"PromptForge is an open-source AI prompting tool for the modern world to discover, create and share creative prompts."*

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Google OAuth** | Seamless sign-in via Google using NextAuth.js — no passwords required |
| 📝 **Create Prompts** | Write and publish AI prompts with custom tags for discoverability |
| ✏️ **Edit Prompts** | Modify your own prompts at any time via the update prompt page |
| 🗑️ **Delete Prompts** | Remove prompts you own directly from your profile |
| 🔍 **Smart Search** | Real-time debounced search across prompt content, tags, and creator usernames |
| 🏷️ **Tag Filtering** | Click any tag on a prompt card to instantly filter the feed by that topic |
| 📋 **One-Click Copy** | Copy any prompt to clipboard with a single click — with visual tick feedback |
| 👤 **User Profiles** | View your own prompt collection or browse other users' public profiles |
| 📱 **Responsive Design** | Full mobile support with an adaptive dropdown navigation menu |

---

## 🏗️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 14.0.4 | React framework with App Router, SSR & file-based routing |
| [React](https://reactjs.org/) | 18 | Component-based UI with hooks (`useState`, `useEffect`) |
| [TypeScript](https://www.typescriptlang.org/) | 5 | End-to-end type safety with interfaces and custom type definitions |
| [Tailwind CSS](https://tailwindcss.com/) | 3 | Utility-first CSS with glassmorphism and gradient design tokens |
| [next/image](https://nextjs.org/docs/app/api-reference/components/image) | — | Optimized, lazy-loaded images with external domain allowlisting |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | 14 | Serverless REST API handlers via the App Router convention |
| [NextAuth.js](https://next-auth.js.org/) | 4.24.5 | Google OAuth provider with custom `signIn` & `session` callbacks |
| [Mongoose](https://mongoosejs.com/) | 8.0.3 | Schema-based ODM with singleton connection for serverless environments |
| [MongoDB](https://www.mongodb.com/) | 6.3.0 | NoSQL document database (`share_prompt` database) |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | 5.1.1 | Password hashing utility (available for credential-based auth extension) |

---

## 📁 Project Structure

```
AI-Prompt-Tool-Next/
│
├── app/                               # Next.js App Router (pages & API routes)
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts           # Google OAuth handler (NextAuth catch-all)
│   │   ├── prompt/
│   │   │   ├── route.ts               # GET  /api/prompt       — list all prompts
│   │   │   ├── new/
│   │   │   │   └── route.ts           # POST /api/prompt/new   — create a prompt
│   │   │   └── [id]/
│   │   │       └── route.ts           # GET / PATCH / DELETE   — single prompt CRUD
│   │   └── users/
│   │       └── [id]/prompts/          # GET /api/users/:id/prompts — user's prompts
│   │
│   ├── create-prompt/
│   │   └── page.tsx                   # Create Prompt page
│   ├── update-prompt/
│   │   └── page.tsx                   # Edit Prompt page (reads ?id= query param)
│   ├── profile/
│   │   ├── page.tsx                   # My Profile page (own prompts + edit/delete)
│   │   └── [id]/
│   │       └── page.tsx               # Other user's public profile page
│   ├── layout.tsx                     # Root layout (Navbar, SessionProvider, globals)
│   └── page.tsx                       # Home / Feed page
│
├── components/                        # Reusable React components
│   ├── Feed.tsx                       # Prompt feed with live search & tag filtering
│   ├── Form.tsx                       # Shared glassmorphism form (create & update)
│   ├── Navbar.tsx                     # Responsive navbar (desktop + mobile dropdown)
│   ├── Profile.tsx                    # Reusable profile layout component
│   ├── PromptCard.tsx                 # Prompt card (copy, tag click, edit, delete)
│   └── Provider.tsx                   # NextAuth SessionProvider client wrapper
│
├── models/                            # Mongoose data models
│   ├── user.ts                        # User schema (email, username, image)
│   └── prompt.ts                      # Prompt schema (creator ref, prompt, tag)
│
├── utils/                             # Shared utilities
│   ├── database.ts                    # MongoDB connection with singleton pattern
│   ├── helpers/                       # Utility helper functions
│   └── typeDefinitions/
│       └── promptType.ts             # TypeScript interfaces: PromtType, MainPrompt
│
├── styles/
│   └── globals.css                    # Global CSS (custom gradients, glassmorphism)
│
├── public/
│   └── assets/                        # Static assets (logo SVG, icons, default avatar)
│
├── next.config.js                     # Next.js config (image domains, top-level await)
├── tailwind.config.ts                 # Tailwind configuration & theme extensions
├── tsconfig.json                      # TypeScript config with path aliases (@components, @utils, etc.)
└── package.json                       # Dependencies and npm scripts
```

---

## 🔌 REST API Reference

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/api/prompt` | Fetch all prompts (populated with creator) | — |
| `POST` | `/api/prompt/new` | Create a new prompt | `{ userId, prompt, tag }` |
| `GET` | `/api/prompt/:id` | Fetch a single prompt by ID | — |
| `PATCH` | `/api/prompt/:id` | Update a prompt's content and/or tag | `{ prompt, tag }` |
| `DELETE` | `/api/prompt/:id` | Delete a prompt by ID | — |
| `GET` | `/api/users/:id/prompts` | Fetch all prompts by a specific user | — |
| `GET/POST` | `/api/auth/[...nextauth]` | NextAuth.js Google OAuth handler | — |

---

## 🗄️ Data Models

### User
```typescript
{
  email:    String   // required, unique
  username: String   // required (derived from Google display name)
  image:    String   // Google profile picture URL
}
```

### Prompt
```typescript
{
  creator: ObjectId  // ref: "User" — populated on read
  prompt:  String    // required — the AI prompt text
  tag:     String    // required — e.g. #ai, #creative, #product
}
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm**, yarn, or pnpm
- A **MongoDB** cluster (e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A **Google Cloud** project with OAuth 2.0 credentials configured

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AI-Prompt-Tool-Next.git
cd AI-Prompt-Tool-Next
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/share_prompt

# Google OAuth credentials (from Google Cloud Console → APIs & Services → Credentials)
GOOGLE_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# NextAuth secret (generate with: openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

> **Google OAuth Setup:** In your Google Cloud project, add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 🔧 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev server | `npm run dev` | Start development server with hot reload at `localhost:3000` |
| Production build | `npm run build` | Build the optimized production bundle |
| Production server | `npm start` | Start the production server |
| Lint | `npm run lint` | Run ESLint to check for code quality issues |

---

## ☁️ Deployment on Vercel

The easiest way to deploy PromptForge is via **[Vercel](https://vercel.com/)** — the creators of Next.js:

1. Push your repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add all `.env.local` variables to the Vercel **Environment Variables** settings
4. Update `NEXTAUTH_URL` to your production domain (e.g. `https://promptforge.vercel.app`)
5. Update the **Authorized Redirect URI** in Google Cloud Console to your production callback URL
6. Click **Deploy** 🚀

Refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more platforms.

---

## 🔒 Authentication Flow

```
User clicks Sign In
       │
       ▼
Google OAuth Consent Screen
       │
       ▼
NextAuth signIn callback
       │
       ├─ User exists in MongoDB? ──Yes──▶ Return session
       │
       No
       │
       ▼
Create new User document in MongoDB
(email, username from Google name, image)
       │
       ▼
Session enriched with MongoDB _id
       │
       ▼
Authenticated — can Create, Edit & Delete prompts
```

---

## 🛣️ Roadmap

- [ ] Like / bookmark prompts to a personal collection
- [ ] Pagination or infinite scroll for the prompt feed
- [ ] Social sharing — shareable prompt links
- [ ] Dark / light mode toggle
- [ ] Rate limiting on API routes
- [ ] Unit and integration tests (Jest / React Testing Library)
- [ ] Username validation regex enforcement
- [ ] Additional OAuth providers (GitHub, Twitter)

---

## 🤝 Contributing

Contributions are welcome! Please open an issue to discuss your idea before submitting a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open-source. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ using <strong>Next.js 14</strong>, <strong>MongoDB</strong> &amp; <strong>NextAuth.js</strong>
</div>
