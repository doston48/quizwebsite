# BrainBlitz Landing & Quiz Platform (`quizwebsite`)

## Project Overview
`quizwebsite` (branded as **BrainBlitz**) is a modern, gamified quiz platform and landing page web application. Built with **React 18**, **Vite**, **Tailwind CSS**, and **Lucide React**, it offers a rich interactive user experience featuring hero sections, social proof, trending quizzes, immersive game modes, teacher tools, testimonials, an interactive join modal, and a dedicated 3-panel quiz creator/editor workspace (`CreateQuiz`).

## Tech Stack
- **Framework / Library:** React 18 (`react`, `react-dom`)
- **Build Tool:** Vite 5 (`@vitejs/plugin-react`)
- **Styling:** Tailwind CSS 3 with PostCSS and Autoprefixer
- **Icons:** `lucide-react`
- **Typography:** Bricolage Grotesque (headings) & Plus Jakarta Sans (body) via Google Fonts

## Building and Running
Key npm scripts available in `package.json`:

- **Development Server:**
  ```bash
  npm run dev
  ```
  Starts the local Vite dev server (typically at `http://localhost:5173`).

- **Production Build:**
  ```bash
  npm run build
  ```
  Bundles the application into the `dist/` directory for production deployment.

- **Preview Production Build:**
  ```bash
  npm run preview
  ```
  Locally preview the production build.

## Project Structure
- `index.html`: Entry HTML with Google Fonts (`Bricolage Grotesque` and `Plus Jakarta Sans`) and root element.
- `src/`:
  - `main.jsx`: React application entry point.
  - `App.jsx`: Main routing / view state manager (`landing` vs `editor` workspace, join modal management).
  - `index.css`: Tailwind directives and global styles.
  - `components/`:
    - `Navbar.jsx`: Sticky frosted-glass navigation bar.
    - `Hero.jsx`: Landing hero section with quick join PIN input and host CTA.
    - `SocialProof.jsx`: Metrics and trust indicators.
    - `TrendingQuizzes.jsx`: Popular quizzes showcase.
    - `GameModes.jsx`: Showcase of different interactive quiz game modes.
    - `HowItWorks.jsx`: Step-by-step onboarding guide.
    - `TeacherSection.jsx`: Features tailored for educators.
    - `Testimonials.jsx`: User reviews and feedback.
    - `Footer.jsx`: Site footer with links and branding.
    - `JoinModal.jsx`: Modal for joining games via PIN.
    - `CreateQuiz.jsx`: 3-panel interactive quiz editor workspace.

## Styling & Design Conventions
- **Tailwind Theme Extensions (`tailwind.config.js`):**
  - **Colors:** Custom `brand` palette (`violet`, `violetDark`, `violetDeep`, `lime`, `limeHover`, `dark`, `cardDark`, `cardBorder`).
  - **Fonts:** Heading (`Bricolage Grotesque`), Sans (`Plus Jakarta Sans`).
  - **Shadows & Glows:** Tactile button shadows (`tactile-violet`, `tactile-lime`) and atmospheric glows (`glow-violet`, `glow-lime`).
