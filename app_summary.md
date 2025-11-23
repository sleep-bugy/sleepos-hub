### 🎯 Project Sleep Website Blueprint

#### 🏗️ Architecture & Foundation
- **Framework**: **Next.js** with **App Router** for React Server Components, efficient routing, and server-side rendering
- **Folder Structure**: File-based routing with each page having its own folder containing `page.tsx`
- **Layout System**:
    - **Root Layout** (`/app/layout.tsx`): Wraps entire application with `<html>` and `<body>` tags, applies global fonts and styles
    - **Admin Dashboard**: Separate layout for admin area with dedicated navigation
- **Page Structure**:
    - `/` → **Homepage**
    - `/features` → Features Page
    - `/download` → Download Page
    - `/team` → Team Page
    - `/about` → About Page

#### ✨ Page Features & Components

| Page | Content & Key Features |
| :--- | :--- |
| **Home** | Hero section, OS introduction, feature previews, download CTA links |
| **Features** | Grid layout with OS feature screenshots and descriptions |
| **Download** | Device cards (image, name), **Search & Filter** (by ROM type: SLEEPOS, AOSP, PORT) |
| **Team** | Team member cards (photo, name, role, country flag icons), "Apply to Team" form |
| **About** | Project Sleep description, community links (Telegram, Discord), social media buttons |

#### ⚙️ Technical Features & Integration
- **Admin System**: 
    - **Protected login** (admin only)
    - **Admin Dashboard**: Forms to add/delete devices, upload ROMs (via links), update changelogs, edit all page content, view team applications
- **Color Theme**: 
    - **Dark Mode**: Elegant dark blue with subtle neon accents
    - **Light Mode**: Elegant light blue with subtle neon accents
- **Internationalization (i18n)**: Using **next-i18next**, supporting 9 languages. All UI text translatable except "Project Sleep" brand name
- **Animations**: **Motion** for smooth, lightweight animations including fade-ins, button hover effects, and scroll animations

### 💻 Key Technical Implementation

#### 1. Building Structure with Next.js App Router
Use `layout.tsx` for shared UI between pages. `page.tsx` is required for accessible routes. Admin dashboard layout will group and protect all admin routes.

#### 2. Implementing i18n with `next-i18next`
- **Configuration**: Create `next-i18next.config.js` and add to `next.config.mjs`
- **App Setup**: Wrap `_app.js` component with `appWithTranslation`
- **Per Page**: Use `serverSideTranslations` in `getStaticProps` to load translation files
- **Components**: Use `useTranslation` hook from `next-i18next` for text translation

#### 3. Animating UI with Motion
- **Basic Components**: Use `<motion.div>` instead of regular `<div>`
- **Enter/Exit Animations**: Combine `initial`, `animate`, and `<AnimatePresence>` for exit animations
- **Interactive Animations**: Use gesture props like `whileHover` and `whileTap` for button and card feedback

### 🚀 Recommended Development Approach

This is a complex project. I recommend starting with the foundation:
1. **Setup Next.js Project** with App Router
2. **Configure `next-i18next`** and create `public/locales` folder structure for 9 languages
3. **Build Basic Layout** and static page components (Home, About, Team, Features) first
4. **Implement Theme Mechanism** (Dark/Light mode)
5. **Build Download Page** with search and filter components
6. **Develop Admin System** and dashboard, including login functionality
