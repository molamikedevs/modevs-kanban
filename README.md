# 📋 Modevs Kanban

![Modevs Kanban Banner](https://i.imgur.com/p5qx8l2.png)

> An enterprise-grade Kanban board featuring complex drag-and-drop state management and real-time database synchronization.

## ✨ Features

- **Advanced Task Management**
  - Create, edit, and delete tasks with a seamless modal interface
  - Categorize workflows (To Do, In Progress, Done)
  - Apply dynamic tags and priority levels (High, Medium, Low)
- **High-Performance Drag & Drop**
  - Smooth, tactile drag-and-drop card reordering
  - **Fractional Indexing:** Optimized database math for `position` updates, ensuring zero performance bottlenecks during card movement
- **Enterprise User Experience**
  - Fully responsive, dark-mode native UI built with shadcn/ui
  - Optimistic UI updates (instant visual feedback before server confirmation)
  - Advanced search and priority filtering
- **Data Architecture**
  - Centralized server state management with TanStack Query
  - Strict schema validation using Zod and React Hook Form
  - NoSQL backend integration via Appwrite

## 🛠 Tech Stack

| Category        | Technologies                                      |
|-----------------|---------------------------------------------------|
| Frontend        | React (Vite), Tailwind CSS, shadcn/ui             |
| State & Forms   | TanStack Query, React Hook Form, Zod              |
| Backend         | Appwrite (Databases)                              |
| Deployment      | Vercel                                            |

## 🚀 Live Demo

Explore the workspace: [Modevs Kanban](https://modevs-kanban.vercel.app/)

## 📸 App Preview

<div align="center">
  <img src="https://i.imgur.com/p5qx8l2.png" width="45%" alt="Kanban Board View">
  <img src="https://i.imgur.com/7SUhu4j.png" width="45%" alt="Task Creation Modal"> 
</div>

## 🛠️ Installation

1. Clone the repository
```bash
git clone [https://github.com/molamikedevs/modevs-kanban.git](https://github.com/molamikedevs/modevs-kanban.git)
cd modevs-kanban
