# WanderWorld App ![In Progress](https://img.shields.io/badge/IN_PROGRESS-C23F84?style=flat-square&labelColor=C23F84&color=C23F84&logoColor=white)

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![ReactHookForm](https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-FF6B6B?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

A modern web application built with Next.js 14 for managing and exploring expeditions.

<img width="680" alt="image" src="https://github.com/user-attachments/assets/0ff0e4ea-2687-4232-8423-5c080a758c17" />

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

### Expedition Management

- Create, read, update, delete expeditions
- Rich text editor for detailed descriptions
- Connect guides to expeditions

### Guide Management

- Create, read, update, delete guides
- Rich text editor for details about a guide
- Link guides to specific expeditions

## 🔑 Environment Variables

```bash
# Required environment variables
GROQ_API_KEY=your_groq_api_key
DATABASE_URL=your_database_url
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
