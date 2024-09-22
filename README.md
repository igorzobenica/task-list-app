# Task List App

A simple task management application built with React, TypeScript, and Tailwind CSS. This app allows users to add, complete, filter, and delete tasks. Tasks can be persisted in local storage, and previously loaded tasks can be fetched from a mock API.

## **Features**

- Add new tasks with optional due dates.
- Mark tasks as complete or incomplete.
- Filter tasks by completion status: All, Open, Done.
- Fetch and display previous tasks from an API.
- Persist tasks in local storage to maintain state between page refreshes.
- Highlight newly added tasks and scroll to them automatically.
- Responsive design using Tailwind CSS.

## **Tech Stack**

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI components
- **State Management**: React hooks, local storage
- **Utilities**: date-fns for date manipulation
- **Build Tool**: Vite

## **Project Setup**

### **Prerequisites**

Ensure you have the following installed on your machine:

- Node.js (version 16 or higher recommended)
- npm (comes with Node.js) or yarn

### **Getting Started**

1. **Clone the repository:**

  ```bash
  git clone https://github.com/your-username/task-list-app.git
  cd task-list-app
  ```

2. **Install dependencies:**

  ```bash
  npm install
  ```

2. **Run the application:**

  ```bash
  npm run dev
  ```

  The application will be available at http://localhost:5173

## **Notes**

- The "Load previous tasks" button will be hidden after the first fetch to avoid redundant data fetches, and the state will be stored in local storage.
- The application uses React hooks for state management, including a custom hook for managing local storage persistence.
- Sorting of tasks is done by due date, prioritizing future dates first, then today's, followed by past dates.
- Newly added tasks are highlighted briefly and automatically scrolled into view.
- Previous tasks are fetched from a mock API endpoint, and this action is recorded in local storage to prevent duplicate fetches.
- Task completion status and other updates are persisted in local storage, maintaining state even after a page refresh.


