# ALAP - Assignment & Learning Analytics Platform

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-orange?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)

ALAP is a state-of-the-art **Assignment & Learning Analytics Platform** designed to bridge the gap between instructors and students through data-driven insights and AI-powered automation. Built with a premium aesthetic and a focus on scalability, ALAP transforms traditional assignment management into an interactive learning experience.

---

## 🚀 AI Implementation: Google Gemini Integration

The core strength of ALAP lies in its seamless integration with **Google Gemini AI**. We have implemented AI not just as a feature, but as a virtual teaching assistant.

### 1. Automated Feedback Generation
Instructors can generate high-quality, constructive feedback for student submissions with a single click. The AI analyzes:
- The student's submission notes.
- Assignment requirements and difficulty level.
- Historical performance data.

### 2. Intelligent Learning Analytics
The platform doesn't just show charts; it interprets them. The **AI Insights** engine analyzes submission distributions and difficulty trends to provide instructors with actionable recommendations (e.g., identifying when a specific topic is too challenging for the majority of the class).

---

## ✨ "Bonus" Logic & Features

We went beyond the basic requirements to implement several advanced "Bonus" features:

- **Intelligent Submission Throttling**: A robust logic layer that prevents duplicate submissions, ensuring that students focus on quality over quantity.
- **Dynamic Difficulty Scaling**: Assignments are categorized by difficulty, allowing the AI to adjust its feedback tone and complexity accordingly.
- **Glassmorphic UI/UX**: A premium design system using Tailwind CSS 4 and Framer Motion for smooth, high-performance transitions and a modern "Glassmorphism" aesthetic.
- **Real-time Status Sync**: Automated status badges and live-sync indicators that provide immediate visual feedback on the state of submissions.
- **Context-Aware Modals**: Intelligent review modals that surface all relevant student data (notes, submission URLs, history) in a single, focused view.

---

## 📂 Folder Structure

The project follows a clean, modular directory structure optimized for Next.js 15+ App Router:

```text
src/
├── app/                    # Next.js App Router (Pages & Layouts)
│   ├── instructor/         # Instructor-specific dashboards & tools
│   │   ├── analytics/      # AI-powered data visualization
│   │   ├── create/         # Assignment creation engine
│   │   ├── dashboard/      # Main instructor overview
│   │   └── submissions/    # Review & AI feedback management
│   ├── student/            # Student-specific dashboards
│   │   ├── dashboard/      # Task tracking & progress
│   │   └── submit/         # Assignment submission portal
│   ├── login/              # Secure authentication
│   └── register/           # New user onboarding
├── components/             # Atomic & Shared UI Components
├── context/                # Global State Management (Auth, Theme)
├── lib/                    # Core Utilities & API Configurations
│   └── api.ts              # Centralized Axios instance with interceptors
└── styles/                 # Global Design System & Utility Classes
```

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS 4, Framer Motion (Animations)
- **Data Visualization**: Recharts (Interactive Analytics)
- **API Handling**: Axios with Bearer Token Interceptors
- **AI Engine**: Google Gemini API
- **UI Components**: Lucide React (Icons), SweetAlert2 (Dialogs), React Hot Toast

---

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env.local` file and add your backend URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 🛡️ Security & Best Practices

- **JWT Authentication**: Secure token-based access control.
- **Role-Based Protected Routes**: Automatic redirection based on user roles (Instructor/Student).
- **Optimistic UI**: Fast, responsive interactions with error fallback mechanisms.
- **Component Reusability**: Highly modularized code for easy maintenance and scaling.

