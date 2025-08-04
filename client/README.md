# NeatFleet Frontend Template

A modern, scalable React frontend template built with TypeScript, featuring a feature-based architecture and cutting-edge development tools.

## 🚀 Quick Start

### create .env file with following variables under client/.env or just rename the file .env.example to .env

```
VITE_API_URL=http://localhost:4000/api # API URL for client to send requests to
```

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Start the mock API server:**
   ```bash
   npm run server
   ```

## 📚 Table of Contents

- [Design System](#design-system)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Features Directory Structure](#features-directory-structure)
- [Barrel Exports](#barrel-exports)
- [UI Components with Shadcn](#ui-components-with-shadcn)
- [State Management](#state-management)
- [Data & Constants](#data--constants)
- [Contributing Guidelines](#contributing-guidelines)
- [Development Workflow](#development-workflow)

## 🎨 Design System

### Typography

| Type        | Font | Size      |
| ----------- | ---- | --------- |
| Headings    | Lato | 2xl - 5xl |
| Subheadings | Lato | xl - 2xl  |
| Body Text   | Lato | base      |
| Buttons     | Lato | base - lg |

- Font source: [Google Fonts - Lato](https://fonts.google.com/specimen/Lato)

---

### Color Palette

| Name          | Hex     | Usage                                                  |
| ------------- | ------- | ------------------------------------------------------ |
| Primary       | #3B82F6 | Key interactive elements, main accents, brand emphasis |
| Secondary     | #2DD4BF | Complementary accents, highlights, calls to action     |
| Neutral Light | #F9FAFB | Backgrounds, container fills                           |
| Black         | #000000 | Primary text, strong contrasts, footer                 |
| Accent Green  | #10B981 | Success states, positive indicators                    |
| Accent Red    | #EF4444 | Error states, warnings, alerts                         |

---

### Icons

[Lucide Icons](https://lucide.dev/icons/)

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Server State:** [TanStack Query](https://tanstack.com/query/latest)
- **Client State:** [Zustand](https://zustand-demo.pmnd.rs/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏗️ Project Architecture

This template follows a **feature-based architecture** that promotes scalability, maintainability, and team collaboration. The structure is organized around business features rather than technical concerns.

```
src/
├── api/                 # Global API configuration
├── components/          # Shared UI components
│   └── ui/             # Shadcn/ui components
├── data/               # Static data and constants
├── features/           # Feature-based modules
│   ├── counter/        # Example feature
│   └── users/          # Example feature
├── layouts/            # Layout components
├── lib/                # Utility functions
├── pages/              # Page components
├── routes/             # Routing configuration
└── types/              # Global TypeScript types
```

## 🎯 Features Directory Structure

Each feature is a self-contained module with its own concerns organized in subdirectories:

```
src/features/[feature-name]/
├── index.ts            # Barrel export file
├── api/                # API calls and endpoints
│   ├── index.ts
│   └── [feature]Api.ts
├── components/         # Feature-specific components
│   ├── index.ts
│   ├── [Component].tsx
│   └── [Container].tsx
├── hooks/              # Custom React hooks
│   ├── index.ts
│   └── use[Feature].ts
├── stores/             # Zustand stores (client state)
│   ├── index.ts
│   └── [feature]Store.ts
└── types/              # TypeScript interfaces
    ├── index.ts
    └── [feature]Types.ts
```

### Example: Users Feature

```typescript
// src/features/users/types/userTypes.ts
export interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// src/features/users/api/usersApi.ts
import { axiosInstance } from '@/api';
import type { UserType } from '../types';

export const fetchUsers = async (): Promise<UserType[]> => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

// src/features/users/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
```

## 📦 Barrel Exports

**Barrel exports** are used throughout the project to create clean, organized import paths and improve developer experience.

### What are Barrel Exports?

Barrel exports are `index.ts` files that re-export modules from a directory, acting as a single entry point.

```typescript
// src/features/users/index.ts
export * from './api';
export * from './components';
export * from './hooks';
export * from './stores';
export * from './types';
```

### Benefits

- **Clean Imports:** `import { useUsers, UserType } from '@/features/users'`
- **Encapsulation:** Internal structure changes don't affect external imports
- **Discoverability:** Single place to see all exports from a feature
- **Refactoring:** Easier to move files without breaking imports

### Best Practices

1. **Always use barrel exports** for directories with multiple files
2. **Keep index.ts files minimal** - only re-export, don't add logic
3. **Use TypeScript's `export type`** for type-only exports when needed
4. **Update barrel exports** when adding/removing files

## 🎨 UI Components with Shadcn

This template uses [Shadcn/ui](https://ui.shadcn.com/), a collection of reusable components built with Radix UI and Tailwind CSS.

### Why Shadcn?

- **Copy-paste components** - Own your code, no external dependencies
- **Customizable** - Built with CSS variables and Tailwind
- **Accessible** - Built on Radix UI primitives
- **TypeScript native** - Full type safety out of the box

### Component Structure

```
src/components/
├── ui/                 # Shadcn/ui components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── index.ts       # Barrel export
├── ErrorComponent.tsx  # Custom shared components
├── LoadingIndicator.tsx
└── index.ts           # Barrel export
```

### Usage Example

```typescript
// Import from barrel export
import { Button } from "@/components/ui";

// Use in component
<Button
  variant="outline"
  size="sm">
  Click me
</Button>;
```

### Adding New Components

1. **Install via CLI:**

   ```bash
   npx shadcn@latest add button
   ```

2. **Add to barrel export:**
   ```typescript
   // src/components/ui/index.ts
   export { Button } from './button';
   ```

### Customization

Components can be customized by:

- Editing the component files directly
- Modifying Tailwind config
- Using CSS variables in `src/index.css`

## 🔄 State Management

This template uses a **dual state management approach**:

### Server State - TanStack Query

[TanStack Query](https://tanstack.com/query/latest) handles all server-side state management.

**Features:**

- Automatic background refetching
- Caching and synchronization
- Optimistic updates
- Loading and error states

```typescript
// Fetching data
const { data: users, isLoading, error } = useUsers();

// Mutations
const createUserMutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

### Client State - Zustand

[Zustand](https://zustand-demo.pmnd.rs/) manages client-side application state.

**Features:**

- Minimal boilerplate
- TypeScript support
- No providers needed
- Devtools support

```typescript
// src/features/counter/stores/counterStore.ts
import { create } from 'zustand';

interface CounterStore {
  value: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterStore>(set => ({
  value: 0,
  increment: () => set(state => ({ value: state.value + 1 })),
  decrement: () => set(state => ({ value: state.value - 1 })),
}));
```

### State Management Guidelines

1. **Use TanStack Query for:**
   - API data fetching
   - Server state caching
   - Background synchronization
   - Optimistic updates

2. **Use Zustand for:**
   - UI state (modals, forms)
   - User preferences
   - Client-side filters
   - Temporary state

3. **Avoid mixing concerns:**
   - Don't store server data in Zustand
   - Don't use TanStack Query for client state

## 📊 Data & Constants

The `src/data/` directory contains static data and constants used throughout the application.

### Structure

```
src/data/
├── index.ts           # Barrel export
├── navItems.ts        # Navigation configuration
├── texts.ts           # Static text content
└── constants.ts       # Application constants
```

### Usage Patterns

**Navigation Configuration:**

```typescript
// src/data/navItems.ts
export const navItems = [
  { text: 'Home', path: '/' },
  { text: 'About', path: '/about' },
  { text: 'Contact', path: '/contact' },
];
```

**Static Text Content:**

```typescript
// src/data/texts.ts
export const texts = {
  about: 'This template provides a robust foundation...',
  contact: 'Get in touch with our team...',
  errors: {
    notFound: 'Page not found',
    serverError: 'Something went wrong',
  },
} as const;
```

### Best Practices

1. **Use const assertions** for better TypeScript inference
2. **Group related constants** in objects
3. **Use SCREAMING_SNAKE_CASE** for constants
4. **Export through barrel exports** for clean imports

## 🤝 Contributing Guidelines

### Setting Up Development Environment

1. **Clone and install:**

   ```bash
   git clone [repository-url]
   cd [project-name]
   npm install
   ```

2. **Start development servers:**

   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Mock API
   npm run server
   ```

### Code Style and Standards

1. **TypeScript:** All code must be written in TypeScript
2. **ESLint:** Follow the configured ESLint rules
3. **Prettier:** Code formatting is handled automatically
4. **Naming Conventions:**
   - Components: PascalCase (`UserCard.tsx`)
   - Hooks: camelCase with `use` prefix (`useUsers.ts`)
   - Types: PascalCase with `Type` suffix (`UserType`)
   - Constants: SCREAMING_SNAKE_CASE (`API_BASE_URL`)

### Creating New Features

1. **Create feature directory:**

   ```bash
   mkdir -p src/features/[feature-name]
   ```

2. **Follow the feature structure:**

   ```
   src/features/[feature-name]/
   ├── index.ts
   ├── components/
   ├── hooks/
   ├── stores/
   ├── types/
   └── api/
   ```

3. **Add barrel exports** for each subdirectory

4. **Update main feature index.ts:**
   ```typescript
   export * from './components';
   export * from './hooks';
   export * from './stores';
   export * from './types';
   export * from './api';
   ```

### Adding UI Components

1. **For Shadcn components:**

   ```bash
   npx shadcn@latest add [component-name]
   ```

2. **For custom components:**
   - Add to `src/components/`
   - Include in barrel export
   - Add TypeScript interfaces
   - Include JSDoc comments

## 🔧 Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Mock API
npm run server       # Start json-server on port 3001
```

### Environment Configuration

1. **Development:** Uses Vite dev server with HMR
2. **Production:** Optimized build with code splitting
3. **API:** Mock server with json-server for development

### Code Formatting with Prettier

This project uses Prettier for consistent code formatting. To set up automatic formatting:

1. **Install the Prettier extension** for your IDE:
   - **VS Code:** Install "Prettier – Code formatter" from the extensions marketplace

2. **Configure format on save** (recommended):

   For **VS Code**, add the following to your `settings.json` (workspace or global):

   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

   To access settings in VS Code:
   - Press `Cmd/Ctrl + Shift + P`
   - Type "Preferences: Open Settings (JSON)"
   - Add the configuration above

3. **Manual formatting:**
   - **VS Code:** `Shift + Alt + F` (Windows/Linux) or `Shift + Option + F` (Mac)
   - **Command line:** `npm run format` (if available)

### File Organization Tips

1. **Keep components small** and focused
2. **Use descriptive names** for files and functions
3. **Group related functionality** in features
4. **Maintain consistent structure** across features
5. **Document complex logic** with comments

### Performance Considerations

1. **Lazy load routes** with React Router
2. **Use React.memo** for expensive components
3. **Implement proper error boundaries**
4. **Optimize bundle size** with code splitting
5. **Use TanStack Query caching** effectively

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Router Documentation](https://reactrouter.com/)
