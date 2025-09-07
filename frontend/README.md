# User & Post Management System

A modern, full-stack web application built with React, TypeScript, and Supabase that provides comprehensive CRUD operations for managing users and their associated posts. This project demonstrates clean architecture, modular component design, and professional development practices.

## 🌟 Features

### User Management

- **Complete CRUD Operations**: Create, read, update, and delete users
- **User Profile Fields**: ID, name, username, and email management
- **Real-time Updates**: Instant UI updates after database operations
- **Form Validation**: Client-side validation with user-friendly error messages

### Post Management

- **Full Post Control**: Create, edit, and delete posts for any user
- **User-Post Relationships**: Clear association between posts and their authors
- **Nested Display**: Posts are displayed within user rows for better organization
- **Efficient Data Management**: Optimized queries and state management

### User Experience

- **Responsive Design**: Mobile-first approach with Material-UI components
- **Professional UI**: Clean, modern interface with consistent styling
- **Modal-based Operations**: Intuitive modal dialogs for all CRUD operations
- **Loading States**: Visual feedback during data operations
- **Error Handling**: Comprehensive error management with user feedback

## 🚀 Tech Stack

### Frontend

- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety and better developer experience
- **Material-UI (MUI)** - Professional component library with icons
- **Vite** - Lightning-fast build tool and development server
- **React Router Dom** - Client-side routing
- **CSS Modules** - Scoped styling with modular architecture

### Backend & Database

- **Supabase** - PostgreSQL database with real-time capabilities
- **Row Level Security** - Secure data access patterns
- **RESTful API** - Clean API design with TypeScript integration

### Development & Deployment

- **ESLint** - Code linting with TypeScript rules
- **Vercel** - Production deployment platform
- **Git** - Version control with professional commit history

## 📁 Project Structure

```
src/
├── components/
│   ├── Header/                 # Navigation component
│   │   ├── Header.tsx
│   │   └── Header.module.css
│   ├── Hero/                   # Landing page hero section
│   │   ├── Hero.tsx
│   │   └── Hero.module.css
│   ├── Modals/                 # All CRUD operation modals
│   │   ├── AddUserModal.tsx
│   │   ├── EditUserModal.tsx
│   │   ├── DeleteUserModal.tsx
│   │   ├── AddPostModal.tsx
│   │   ├── EditPostModal.tsx
│   │   └── DeletePostModal.tsx
│   └── UserTable/              # Modular table components
│       ├── UserTable.tsx       # Main table container
│       ├── UserTableRow.tsx    # Individual user row
│       └── PostsTable.tsx      # Nested posts display
├── pages/
│   ├── HomePage/               # Landing page
│   └── UsersPage/              # Main application page
├── services/
│   ├── api.ts                  # Supabase API layer
│   └── supabaseClient.ts       # Database client
├── types/
│   └── index.ts                # TypeScript interfaces
└── assets/                     # Static assets
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### 1. Clone the Repository

```bash
git clone https://github.com/cryptmask-v1/tech-task-dvbg.git
cd tech-task-dvbg/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

Execute the following SQL in your Supabase SQL Editor:

```sql
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for production)
CREATE POLICY "Enable read access for all users" ON users FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON users FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON users FOR DELETE USING (true);

CREATE POLICY "Enable read access for all posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all posts" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all posts" ON posts FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all posts" ON posts FOR DELETE USING (true);
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Architecture & Design Patterns

### Component Architecture

- **Modular Design**: Each component has a single responsibility
- **Props Drilling Management**: Efficient state management between parent and child components
- **Reusable Modals**: Generic modal components that handle different CRUD operations
- **Separation of Concerns**: Clear distinction between UI, logic, and data layers

### State Management

- **Local State**: React useState for component-specific state
- **Prop Passing**: Clean data flow between components
- **API Integration**: Centralized API calls with error handling

### TypeScript Integration

- **Interface Definitions**: Strong typing for User and Post entities
- **API Response Types**: Type-safe API responses
- **Component Props**: Fully typed component interfaces
- **Error Handling**: Typed error responses

## 🚀 Deployment

### Vercel Deployment

The application is configured for Vercel deployment with:

1. **Build Configuration**: Optimized build settings in `vercel.json`
2. **Environment Variables**: Secure environment variable management
3. **Routing**: SPA routing configuration for client-side navigation
4. **Static Asset Optimization**: Efficient asset serving

### Environment Variables for Production

Set these in your Vercel dashboard:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🔧 Key Features Implementation

### CRUD Operations

- **Users**: Complete user lifecycle management
- **Posts**: Full post management with user relationship
- **Real-time Updates**: Immediate UI feedback after operations
- **Error Handling**: Comprehensive error management

### Database Relationships

- **Foreign Keys**: Posts linked to users via `user_id`
- **Cascade Deletes**: Automatic cleanup of related data
- **Data Integrity**: Referential integrity constraints

### User Interface

- **Material Design**: Consistent, professional appearance
- **Responsive Layout**: Mobile-first responsive design
- **Interactive Elements**: Hover states, loading indicators
- **Form Validation**: Client and server-side validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Cryptmask**

- GitHub: [@cryptmask-v1](https://github.com/cryptmask-v1)
- Project Repository: [tech-task-dvbg](https://github.com/cryptmask-v1/tech-task-dvbg)

---

_This project was developed as a technical demonstration showcasing modern React development practices, TypeScript integration, and full-stack application architecture._
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
