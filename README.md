# WanderWorld App

> A modern web application built with Next.js 14 for managing and exploring expeditions.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)](https://tailwindcss.com/)
[![MUI](https://img.shields.io/badge/MUI-5-007FFF)](https://mui.com/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-Enabled-FF6B6B)](https://groq.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)](https://www.prisma.io/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC)](https://redux-toolkit.js.org/)
[![License](https://img.shields.io/badge/License-Private-red)]()

> 🎓 **Note**: This is a personal pet project where I actively experiment with new technologies and development patterns. It serves as both a practical application and a learning environment for modern web development practices.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **UI:** TailwindCSS, MUI
- **AI Integration:** Groq AI
- **Forms:** React Hook Form with Zod validation
- **Database:** Prisma ORM
- **State Management:** Redux Toolkit
- **Data Fetching:** TanStack Query (React Query)
- **Rich Text Editor:** Tiptap
- **Testing:** Jest
- **Date Handling:** date-fns
- **API Client:** Axios
- **Code Quality:** ESLint, Prettier

## ✨ Features

- Server-side rendering (SSR) for optimal performance
- AI-powered features using Groq AI used for expedition description
- Type-safe database operations with Prisma
- Form handling with validation
- Rich text editing capabilities
- Date and time management
- Responsive design with Material-UI components
- State management with Redux
- API integration with React Query
- Comprehensive test coverage

## 🎮 Core Functionalities

### 📝 Expedition Management

- Create, read, update, delete expeditions
- Rich text editor for detailed descriptions
- Connect guides to expeditions

### 👥 Guide Management

- Create, read, update, delete guides
- Rich text editor for details about a guide
- Link guides to specific expeditions

## 🔑 Environment Variables

```bash
# Required environment variables
NEXT_PUBLIC_API_URL=your_api_url
GROQ_API_KEY=your_groq_api_key
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm package manager

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd expeditions-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up the database:

```bash
pnpm prisma:generate
pnpm prisma:migrate
```

4. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Check code formatting
- `pnpm format:fix` - Fix code formatting
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm prisma:studio` - Open Prisma database UI
- `pnpm reset` - Clean and reinstall dependencies

## 📁 Project Structure

```
src/
├── app/          # Next.js app router pages and layouts
├── shared/       # Shared UI components and utilities
├── features/     # Feature-specific components
├── entities/     # Domain entities and types
├── lib/          # Core utilities and configurations
├── providers/    # React context providers
├── redux/        # Redux store and slices
├── styles/       # Global styles
└── utils/        # Utility functions
```

## 📋 Development Guidelines

- Use React Server Components by default
- Minimize client-side JavaScript with selective 'use client' directives
- Implement proper loading and error states
- Use semantic HTML elements
- Write comprehensive tests for critical functionality
- Follow the established project structure

## ⚖️ License

Private - All rights reserved

## 🤝 Contributing

This is a private project.

## 🎯 Planned Implementations

- 🔄 **Framework & UI Updates**

  - Upgrade to Next.js 15
  - Migrate to TailwindCSS 4.0
  - Optimize bundle size and performance
  - Implement searching and filtering functionalities

- 🔄 **CI/CD Pipeline**

  - GitHub Actions workflow
  - Deployment automation
  - Code quality checks

- 🔐 **Authentication & Authorization**

  - Role-based access control (RBAC)
  - Protected routes
  - Social login providers

- 📱 **Responsive Web Design**

  - Mobile-first approach
  - Tablet, Desktop optimization
  - Cross-browser compatibility

- ✅ **Testing Suite**
  - Unit tests with Jest
  - Integration tests
  - E2E tests with Playwright
