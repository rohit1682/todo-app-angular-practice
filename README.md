# Angular Todo List Application

A modern, full-featured Todo List application built with Angular 21, featuring complete CRUD operations, reactive state management, and persistent local storage.

![Angular](https://img.shields.io/badge/Angular-21.1.4-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Quick Start

```bash
# Navigate to project directory
cd todo-app

# Install dependencies (if needed)
npm install

# Start development server
npm start
```

Open your browser and navigate to **http://localhost:4200**

## ✨ Features

### Core Functionality
- ✅ **Create** - Add new todos with title and description
- ✅ **Read** - View all todos with real-time updates
- ✅ **Update** - Edit todo details and toggle completion status
- ✅ **Delete** - Remove individual todos or clear all completed

### Additional Features
- 📊 Real-time statistics (Total, Pending, Completed)
- 🔍 Filter todos by status (All, Pending, Completed)
- ✏️ Inline editing with save/cancel options
- 💾 Automatic persistence using localStorage
- 📱 Fully responsive design for mobile and desktop
- 🎨 Modern UI with smooth animations
- ⚡ Reactive state management with RxJS
- 🔒 Type-safe with TypeScript

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [CRUD Operations](#-crud-operations)
- [Data Model](#-data-model)
- [Usage Guide](#-usage-guide)
- [Development](#-development)
- [Technologies](#-technologies)
- [Browser Support](#-browser-support)

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── todo-list/          # Main container component
│   │   │   │   ├── todo-list.ts
│   │   │   │   ├── todo-list.html
│   │   │   │   └── todo-list.css
│   │   │   ├── todo-form/          # Form for creating todos
│   │   │   │   ├── todo-form.ts
│   │   │   │   ├── todo-form.html
│   │   │   │   └── todo-form.css
│   │   │   └── todo-item/          # Individual todo item
│   │   │       ├── todo-item.ts
│   │   │       ├── todo-item.html
│   │   │       └── todo-item.css
│   │   ├── models/
│   │   │   └── todo.model.ts       # TypeScript interfaces
│   │   ├── services/
│   │   │   └── todo.service.ts     # CRUD operations service
│   │   ├── app.ts                  # Root component
│   │   ├── app.html
│   │   ├── app.css
│   │   └── app.routes.ts
│   ├── styles.css                  # Global styles
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗️ Architecture

### Service Layer

**TodoService** (`src/app/services/todo.service.ts`)

The service layer implements all CRUD operations using:
- **RxJS BehaviorSubject** for reactive state management
- **LocalStorage API** for data persistence
- **Platform detection** for SSR compatibility

### Component Architecture

#### 1. TodoList Component
Main container that:
- Subscribes to the todo stream from the service
- Manages filtering logic (All/Pending/Completed)
- Displays real-time statistics
- Delegates CRUD operations to the service
- Handles empty states

#### 2. TodoForm Component
Form component that:
- Captures user input for new todos
- Validates form data (title required)
- Emits create events to parent component
- Provides clear/reset functionality

#### 3. TodoItem Component
Individual todo display that:
- Shows todo details with status indicators
- Provides inline editing mode
- Handles toggle completion
- Emits update/delete events to parent
- Displays creation timestamps

## 🔧 CRUD Operations

### Create Operations

#### `createTodo(createTodoDto: CreateTodoDto): Todo`
Creates a new todo with auto-generated ID and timestamps.

```typescript
const newTodo = todoService.createTodo({
  title: 'Complete Angular project',
  description: 'Implement all CRUD operations'
});
```

**Features:**
- Auto-generates unique ID
- Sets `completed` to `false` by default
- Adds `createdAt` and `updatedAt` timestamps
- Persists to localStorage
- Emits updated state to subscribers

### Read Operations

#### `getTodos(): Observable<Todo[]>`
Returns an observable stream of all todos for reactive updates.

```typescript
todoService.getTodos().subscribe(todos => {
  console.log('Current todos:', todos);
});
```

#### `getTodoById(id: number): Todo | undefined`
Retrieves a specific todo by its ID.

```typescript
const todo = todoService.getTodoById(1);
```

#### `getCompletedTodos(): Todo[]`
Returns all todos with `completed` status set to `true`.

```typescript
const completed = todoService.getCompletedTodos();
```

#### `getPendingTodos(): Todo[]`
Returns all todos with `completed` status set to `false`.

```typescript
const pending = todoService.getPendingTodos();
```

### Update Operations

#### `updateTodo(id: number, updateTodoDto: UpdateTodoDto): Todo | null`
Updates one or more properties of an existing todo.

```typescript
// Update title only
todoService.updateTodo(1, { title: 'Updated title' });

// Update multiple fields
todoService.updateTodo(1, {
  title: 'New title',
  description: 'New description',
  completed: true
});
```

**Features:**
- Supports partial updates (only provided fields are updated)
- Automatically updates `updatedAt` timestamp
- Persists changes to localStorage
- Returns updated todo or `null` if not found

#### `toggleTodoComplete(id: number): Todo | null`
Toggles the completion status of a todo.

```typescript
const toggled = todoService.toggleTodoComplete(1);
```

### Delete Operations

#### `deleteTodo(id: number): boolean`
Removes a specific todo from the list.

```typescript
const deleted = todoService.deleteTodo(1);
if (deleted) {
  console.log('Todo deleted successfully');
}
```

**Returns:** `true` if deleted successfully, `false` if not found

#### `clearCompletedTodos(): void`
Removes all todos with `completed` status set to `true`.

```typescript
todoService.clearCompletedTodos();
```

## 📊 Data Model

### Interfaces

```typescript
// Core Todo interface
interface Todo {
  id: number;           // Unique identifier (auto-generated)
  title: string;        // Todo title
  description: string;  // Todo description
  completed: boolean;   // Completion status
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}

// Create DTO
interface CreateTodoDto {
  title: string;        // Required
  description: string;  // Optional
}

// Update DTO (all fields optional)
interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
}
```

## 📖 Usage Guide

### Creating a Todo

1. Enter a title in the "Title" field (required)
2. Optionally add a description in the "Description" field
3. Click the "Add Todo" button
4. The todo appears immediately in the list

### Viewing Todos

- All todos are displayed in the main list
- Statistics show Total, Pending, and Completed counts
- Each todo displays:
  - Title and description
  - Creation date
  - Completion status badge
  - Action buttons (edit, delete)

### Filtering Todos

Use the filter buttons to view:
- **All** - Shows all todos
- **Pending** - Shows only incomplete todos
- **Completed** - Shows only completed todos

### Editing a Todo

1. Click the edit icon (✏️) on any todo
2. Modify the title or description in the inline form
3. Click "Save" to confirm changes
4. Click "Cancel" to discard changes

### Completing a Todo

- Click the checkbox next to any todo to toggle its completion status
- The status badge updates automatically
- Statistics are updated in real-time

### Deleting a Todo

1. Click the delete icon (🗑️) on any todo
2. Confirm the deletion in the dialog
3. The todo is removed immediately

### Clearing Completed Todos

1. Click the "Clear Completed" button
2. Confirm the action
3. All completed todos are removed at once

## 💻 Development

### Available Commands

```bash
# Start development server
npm start
# or
ng serve

# Build for production
npm run build
# or
ng build

# Run tests
npm test

# Lint code
npm run lint

# Generate new component
ng generate component components/my-component

# Generate new service
ng generate service services/my-service
```

### Development Server

The development server runs on `http://localhost:4200` by default. The app will automatically reload when you make changes to source files.

If port 4200 is already in use:
```bash
ng serve --port 4300
```

### Production Build

Build artifacts are stored in the `dist/` directory:

```bash
npm run build
```

The build is optimized for production with:
- Minification
- Tree-shaking
- Ahead-of-Time (AOT) compilation
- Bundle optimization

## 🛠️ Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 21.1.4 | Frontend framework |
| **TypeScript** | 5.9.2 | Type-safe JavaScript |
| **RxJS** | 7.8.0 | Reactive programming |
| **Node.js** | 22.22.0 | Runtime environment |
| **npm** | 11.10.0 | Package manager |

### Key Angular Features Used

- **Standalone Components** - Modern Angular architecture without NgModules
- **Reactive Forms** - Template-driven forms with ngModel
- **Dependency Injection** - Service layer with singleton pattern
- **RxJS Observables** - Reactive state management
- **Component Communication** - @Input, @Output, EventEmitter
- **Directives** - *ngFor, *ngIf, [class], (event)
- **Pipes** - Date formatting
- **Lifecycle Hooks** - OnInit, OnDestroy

## 💾 Data Persistence

### LocalStorage Strategy

All todos are automatically saved to the browser's localStorage:

**Storage Keys:**
- `todos` - JSON array of all todo objects
- `nextId` - Next available ID for new todos

**Automatic Sync:**
1. User performs an action (create, update, delete)
2. Service updates in-memory array
3. Changes are saved to localStorage
4. BehaviorSubject emits new state
5. Subscribed components update UI automatically

**Browser Compatibility:**
The service uses Angular's `isPlatformBrowser` to detect browser environment, ensuring compatibility with Server-Side Rendering (SSR).

### Viewing Stored Data

Open browser DevTools:
1. Press F12 to open DevTools
2. Navigate to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Expand "Local Storage"
4. Click on your domain
5. View `todos` and `nextId` keys

### Clearing Data

To reset the application:

**Via DevTools:**
1. Open DevTools → Application/Storage → Local Storage
2. Delete `todos` and `nextId` keys
3. Refresh the page

**Via Console:**
```javascript
localStorage.clear();
location.reload();
```

## 🌐 Browser Support

The application is compatible with:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

**Requirements:**
- Modern browser with ES6+ support
- LocalStorage API support
- JavaScript enabled

## 🎨 UI/UX Features

### Design Elements
- Modern, clean interface with card-based layout
- Purple gradient background
- Smooth transitions and animations
- Intuitive icons (✏️ edit, 🗑️ delete, ✓ complete)
- Color-coded status badges
- Empty state messages
- Responsive design for all screen sizes

### Color Scheme
- **Primary:** #4CAF50 (Green) - Success actions
- **Warning:** #ffc107 (Amber) - Pending status
- **Danger:** #f44336 (Red) - Delete actions
- **Background:** Purple gradient
- **Text:** #333 (Dark gray)

### Accessibility
- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Clear visual feedback
- High contrast text

## 🧪 Testing

### Manual Testing Checklist

- [x] Create todo with title only
- [x] Create todo with title and description
- [x] View all todos
- [x] Filter by pending status
- [x] Filter by completed status
- [x] Edit todo title
- [x] Edit todo description
- [x] Toggle completion status
- [x] Delete single todo
- [x] Clear all completed todos
- [x] Data persists after browser refresh
- [x] Form validation works correctly
- [x] Empty states display properly
- [x] Statistics update in real-time

## 🔮 Future Enhancements

Potential features to add:

- [ ] Backend API integration (REST/GraphQL)
- [ ] User authentication and authorization
- [ ] Todo categories and tags
- [ ] Due dates and reminders
- [ ] Priority levels (High, Medium, Low)
- [ ] Search and advanced filtering
- [ ] Drag-and-drop reordering
- [ ] Dark mode toggle
- [ ] Export/import (JSON, CSV)
- [ ] Undo/redo functionality
- [ ] Keyboard shortcuts
- [ ] Unit and E2E tests
- [ ] Progressive Web App (PWA) features
- [ ] Multi-language support (i18n)
- [ ] Collaborative features (sharing, comments)

## 📚 Learning Resources

- [Angular Documentation](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Angular CLI Reference](https://angular.dev/cli)

## 🐛 Troubleshooting

### Port Already in Use
```bash
ng serve --port 4300
```

### Build Errors
Clear Angular cache:
```bash
rm -rf .angular
ng build
```

### Module Not Found
Reinstall dependencies:
```bash
rm -rf node_modules
npm install
```

### LocalStorage Not Working
- Check if browser allows localStorage
- Verify you're not in private/incognito mode
- Check browser console for errors

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your own applications.

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome!

## 📞 Support

For Angular-related questions:
- [Angular Discord](https://discord.gg/angular)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/angular)

---

**Built with ❤️ using Angular 21**

*Last Updated: February 20, 2026*
# todo-app-angular-practice
