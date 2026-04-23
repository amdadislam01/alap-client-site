# ALAP - Assignment & Learning Analytics Platform

[![Next.js](https://img.shields.io/badge/Next.js-16+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-orange?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)

ALAP is a state-of-the-art **Assignment & Learning Analytics Platform** designed to bridge the gap between instructors and students through data-driven insights and AI-powered automation. Built with a premium aesthetic and a focus on scalability, ALAP transforms traditional assignment management into an interactive learning experience.

---

## 🔑 Test Credentials

For testing purposes, you can use the following accounts:

### 👨‍🏫 Instructor Account
- **Email**: `instructor@alap.com`
- **Password**: `password123`

### 🎓 Student Account
- **Email**: `student@alap.com`
- **Password**: `password123`

---

## 🚀 AI Implementation: Google Gemini Integration

The core strength of ALAP lies in its seamless integration with **Google Gemini AI**. We have implemented AI not just as a feature, but as a robust, context-aware engine that acts as a virtual teaching assistant for instructors and a progress catalyst for students.

### 🧠 How the AI Engine Works

Our AI implementation follows a sophisticated **Context-Aware Processing** workflow:

1.  **Context Injection**: When an instructor requests AI assistance, the platform gathers multiple data points, including assignment requirements, student submission notes, and historical performance metrics.
2.  **Prompt Engineering**: This raw data is fed into specialized, highly-engineered prompts designed to minimize hallucination and maximize pedagogical value.
3.  **Real-time Processing**: Using the Google Gemini API, the platform processes these inputs in real-time, delivering insights within seconds.
4.  **Structured Output Parsing**: The AI's responses are parsed and integrated directly into the UI, providing seamless transitions between automated and manual tasks.

### 🛠️ Core AI Features in Detail

#### 1. Automated Constructive Feedback
Instructors can generate high-quality, personalized feedback for student submissions with a single click. The AI analyzes:
- **Student Intent**: Interprets the submission notes to understand the student's approach and challenges.
- **Requirement Matching**: Cross-references the submission with the original assignment difficulty and criteria.
- **Actionable Advice**: Instead of generic praise, the AI provides specific "Next Steps" to help students improve.

#### 2. Intelligent Assignment Refinement
Creating a clear assignment is half the battle. Our **Assignment Refine** tool allows instructors to write a rough draft and let the AI:
- **Optimize for Clarity**: Fixes ambiguous wording and structures requirements into logical sections.
- **Align with Difficulty**: Suggests adjustments to ensure the task matches the intended "Beginner/Advanced" level.

#### 3. AI-Driven Learning Analytics
The platform doesn't just show charts; it interprets them. The **AI Insights** engine analyzes submission distributions to provide:
- **Predictive Recommendations**: Identifies if a specific topic is consistently challenging for the class.
- **Pedagogical Shifts**: Suggests when an instructor might need to provide additional resources or revisit a specific lecture topic.

---

## ✨ "Bonus" Logic & Features

We went beyond the basic requirements to implement several advanced "Bonus" features:

- **Intelligent Submission Throttling**: A robust logic layer that prevents duplicate submissions, ensuring that students focus on quality over quantity.
- **Dynamic Difficulty Scaling**: Assignments are categorized by difficulty, allowing the AI to adjust its feedback tone and complexity accordingly.
- **Glassmorphic UI/UX**: A premium design system using Tailwind CSS 4 and Framer Motion for smooth, high-performance transitions and a modern "Glassmorphism" aesthetic.
- **Real-time Status Sync**: Automated status badges and live-sync indicators that provide immediate visual feedback on the state of submissions.
- **Context-Aware Modals**: Intelligent review modals that surface all relevant student data (notes, submission URLs, history) in a single, focused view.
- **Floating AI Chatbot Assistant**: An interactive, persistent floating chatbot integrated seamlessly across the platform, offering immediate automated support with predefined Q&A and smooth animations.

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

## 🔑 API Endpoints

###  Authentication
- `POST /auth/register` - Register a new account (Student/Instructor)
- `POST /auth/login` - Login and receive JWT access token

###  Assignments
- `GET /assignments` - Retrieve all available assignments
- `GET /assignments/:id` - Get detailed information for a specific assignment
- `POST /assignments` - Create a new assignment (Instructor)
- `POST /assignments/refine` - AI-powered assignment description optimization (Instructor)

###  Submissions
- `POST /submissions` - Submit an assignment project URL and notes (Student)
- `GET /submissions/student` - View own submission history and feedback (Student)
- `GET /submissions/instructor` - View all student submissions for review (Instructor)
- `PATCH /submissions/:id` - Update submission status and add manual feedback (Instructor)
- `POST /submissions/:id/ai-feedback` - Generate constructive AI feedback for a submission (Instructor)

###  Analytics
- `GET /analytics/instructor` - Fetch platform-wide learning analytics and distributions (Instructor)

---

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amdadislam01/alap-client-site.git
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

