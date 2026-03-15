TaskBoard – Full Stack Task Management Dashboard

TaskBoard is a Kanban-style task management dashboard built as part of the Creative Upaay Full Stack Development Assignment.
The application allows users to visually organize tasks into different stages, manage subtasks, assign priorities and due dates, and filter tasks efficiently.

The project replicates the UI provided in the Figma design while implementing several functional features using a modern full-stack architecture.

Live Demo

(Add deployment links here)

Frontend:

Backend API:

Features
Level 1 Features (Mandatory)
Dashboard UI

Implemented a Kanban-style dashboard based on the provided Figma design.

Tasks are organized into three sections:

To Do

In Progress

Done

Task Management

Users can:

Create tasks with title and description

Assign priority levels

Add due dates

Add custom tags

Drag and Drop

Tasks can be moved between sections using drag-and-drop functionality.

Filtering

Tasks can be filtered based on:

Priority

Completion status

Custom tags

Tasks due today

State Management

Redux Toolkit is used for global state management.

Local Storage Persistence

All task data persists using Local Storage so tasks remain intact after page refresh.

Level 2 Features Implemented

The assignment required implementing 4 out of 6 optional features.
This project implements the following:

Authentication (JWT)

User signup and login

JWT-based authentication

Protected dashboard routes

Due Date and Reminder

Tasks can include due dates.
The system shows visual indicators for:

Tasks due today

Overdue tasks

Subtasks

Each task can contain nested subtasks that can be marked as completed.

Custom Task Tags

Users can assign tags to tasks which can also be used for filtering.

Tech Stack
Frontend

React (Vite)

Redux Toolkit

Tailwind CSS

React Router

Drag and Drop library

Backend

Node.js

Express.js

JWT Authentication

Local JSON storage (for user data)

Project Structure
TaskBoard
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── services
│   │   ├── utils
│   │   └── assets
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── middleware
│   ├── data
│   └── server.js
Approach

The project was developed with a component-based architecture using React.

Key design considerations:

Separation of concerns between UI components and application logic.

Redux Toolkit for centralized state management.

Local Storage persistence to ensure task data remains after refresh.

Reusable UI components for task cards, columns, and modals.

Modular backend architecture separating routes, controllers, and middleware.

The UI was built to closely match the provided Figma design while maintaining responsiveness and usability.

Assumptions Made

Some assumptions were made to simplify implementation:

Task data is stored in Local Storage instead of a database.

User data is stored in a local JSON file for authentication.

Subtasks are stored inside their parent task object.

Custom task fields were simplified to a single tag system.

The dashboard focuses on core task management features rather than team collaboration features.

Running the Project Locally
1. Clone the Repository
git clone https://github.com/yourusername/TaskBoard.git
cd TaskBoard
2. Setup Backend

Navigate to backend folder:

cd backend

Install dependencies:

npm install

Create a .env file:

PORT=5000
JWT_SECRET=your_secret_key

Start the backend server:

npm run dev

Backend will run at:

http://localhost:5000
3. Setup Frontend

Open another terminal.

Navigate to frontend:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Frontend will run at:

http://localhost:5173
Future Improvements

Possible enhancements include:

Real-time collaboration using WebSockets

Database integration (MongoDB / PostgreSQL)

Activity logs for task history

Notifications for upcoming deadlines

Team member assignments

Improved mobile responsiveness

Author

Shorya Taneja

License

This project was created for educational purposes as part of the Creative Upaay assignment.