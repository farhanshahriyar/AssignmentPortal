# 🎓 Assignment Submission Portal

A comprehensive fullstack simulation of an assignment management system built with **Next.js App Router**, **TypeScript**, and **shadcn/ui**, featuring role-based access control, demo authentication, interactive analytics, and beautiful dashboards — all without using a database, as per task requirements.

> ✅ **Note**: Currently, this app is built without a database. All data is handled via browsers `localStorage` and mock authentication.

---

## 🚀 Live Demo
👉 [Click here to view the live site](https://assignmentportal.netlify.app/)

---

## 👥 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Instructor | `instructor@demo.com` | `instructor123` |
| Student    | `student@demo.com`    | `student123`    |

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **shadcn/ui** (components & sidebar)
- **TailwindCSS**
- **Recharts** (pie chart)
- **LocalStorage** (mock persistence)
- **Role-based Routing** (client-side)

---

## ✨ Key Features

### 🔐 Authentication System

- Demo login with credentials
- Local registration (non-persistent)
- Role-based access control
- Session handling with `localStorage`

### 🎓 Instructor Panel

- Create assignments (title, description, deadline)
- View & review student submissions
- Provide feedback and update status (Pending / Accepted / Rejected)
- Pie chart analytics of submission statuses
- Quick access dashboard with real-time stats

### 🧑‍🎓 Student Panel

- View assignments with deadlines
- Submit assignment (URL + notes)
- Track status and view instructor feedback
- Dashboard with personal statistics

### 📊 Visual Analytics

- Interactive pie chart with color-coded statuses
- Real-time submission stats
- Badge indicators and summary metrics

### 🧭 Sidebar & UI/UX

- Fully responsive design
- Collapsible sidebar with smooth animations
- Role-specific navigation
- Breadcrumbs, profile menu, and more

---

## 📂 Project Structure (Simplified)

- **/app**: Main application root.
- **/auth**: Contains login and registration pages.
- **/dashboard**: Protected routes accessible by authenticated users of any role.
- **/components**: Reusable UI components like Sidebar, Charts, and Forms.
- **/lib**: Utility functions and role-related logic helpers.
- **/context**: Context providers for authentication and data management.



---

## 🧪 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/farhanshahriyar/AssignmentPortal.git
cd AssignmentPortal
```

### 2. Install dependencies
```bash

npm install
# or
yarn install
```


### 3. Start the development server
```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 to view it in the browser.


📌 Notes
- This project does not use any backend or database.

- All data is stored using localStorage.

- User roles are simulated for the purpose of this assessment.

- The app is deployable to platforms like Vercel or Netlify without any backend setup.


🙋‍♂️ Author
Made with by Md. Farhan Shahriyar 
