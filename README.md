# 🎓 Assignment Submission Portal

A comprehensive fullstack simulation of an assignment management system built with **Next.js App Router**, **TypeScript**, and **shadcn/ui**, featuring role-based access control, demo authentication, interactive analytics, and beautiful dashboards — all without using a database, as per task requirements.


A full-stack web application for managing assignments, built using:

- ⚡ **Next.js (App Router)**
- 🔒 **NextAuth.js** for Authentication
- 🧠 **Prisma ORM** with PostgreSQL or SQLite
- 💅 **Tailwind CSS** + **ShadCN UI**
- 🎯 Role-based access (Instructor & Student)

---


## ✨ Features

- ✅ Sign Up / Sign In with role-based dashboard
- 👨‍🏫 Instructor can:
  - Create new assignments
  - View and review submissions
  - See analytics (charts)
- 👨‍🎓 Student can:
  - View available assignments
  - Submit work
  - Track submission status
- 🔐 Secure authentication with hashed passwords
- ⚙️ Reusable UI components with ShadCN

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

### 4. Set up environment variables
Create a .env file in the root:
```bash
DATABASE_URL="file:./dev.db" # or your PostgreSQL URL
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### 5. Prisma Setup
Generate client & migrate database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```


Open http://localhost:3000 to view it in the browser.



🙋‍♂️ Author
Made with by Md. Farhan Shahriyar 
