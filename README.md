<div align="center">

# ⚡ DevSync

### Real-Time Collaborative Code Editor
*Code together. Ship faster.*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-000000?style=for-the-badge)](https://devsync-368a5fbtw-luckysharma06102004-stacks-projects.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/luckysharma06102004-stack)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Socket.io](https://img.shields.io/badge/Socket.io-ffffff?style=for-the-badge&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## 🔍 What is DevSync?

DevSync is a **full-stack real-time collaborative code editor** where multiple developers can join a shared room, write code together, and see each other's changes instantly — like Google Docs, but built for engineers.

> Built with 20+ real-time Socket.io events, an AI Copilot powered by Groq LLaMA 3, in-browser code execution across 20+ languages, and a collaborative whiteboard — all in one app.

---

## ✨ Features

### 👥 Real-Time Collaboration
- Live multi-user editing with **per-user cursor tracking**
- Real-time **selection highlighting** per collaborator
- User presence list with online/offline indicators
- Join/leave notifications + **group chat** inside the editor

### 📁 File Management
- Create, rename, edit, and delete files and folders
- **Multi-file tabbed editor** — work across files simultaneously
- Upload local folders directly into the session
- Download the entire codebase as a **ZIP file**

### 💻 Code Editor
- Syntax highlighting with **auto language detection**
- Smart auto-suggestions per language
- **40+ themes** + customizable font size and family
- Keyboard shortcuts: `Ctrl+S` to save, `Ctrl+Enter` to run

### ⚡ Code Execution
- Run code directly in the browser — no setup needed
- Powered by **Wandbox API**
- Supports **20+ languages**: JavaScript, Python, Java, C++, Go, Rust, and more
- Clean output panel with success/error detection

### 🤖 AI Copilot
- Code generation from **natural language prompts**
- Powered by **Groq API (LLaMA 3)**
- Generate, explain, debug, or optimize code
- Insert, copy, or replace code in the active file
- Proxied through backend — no CORS issues, no exposed API keys

### 🕒 Version History
- Save **named snapshots** of your code at any point
- Auto-save every **5 minutes**
- Restore any previous version instantly
- Persisted in localStorage — survives page refresh

### 🎨 Collaborative Whiteboard
- Real-time drawing powered by **tldraw**
- Switch between coding and drawing mode instantly
- Great for planning architecture or explaining logic visually

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Tailwind CSS |
| Editor Engine | CodeMirror 6 |
| Backend | Node.js, Express |
| Real-Time | Socket.io |
| Code Execution | Wandbox API |
| AI Copilot | Groq API (LLaMA 3) |
| Whiteboard | tldraw |
| Routing | React Router |
| Deployment | Vercel (frontend), Render (backend) |

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/luckysharma06102004-stack/DevSync.git
cd DevSync
```

### 2. Create environment files

Inside `client/` create `.env`:
```bash
VITE_BACKEND_URL=http://localhost:3000
```

Inside `server/` create `.env`:
```bash
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Install dependencies

```bash
# Client
cd client && npm install

# Server
cd ../server && npm install
```

### 4. Start the servers

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

### 5. Open in browser
```
http://localhost:5173
```

---

## 🎯 How to Use

1. Open the app and enter a **Room ID** + **Username**
2. Share the Room ID with teammates
3. Everyone joins the same room and edits code live
4. Use the sidebar to switch between **Files, Chat, Copilot, Run, and Version History**
5. Hit **Run** to execute code and see output instantly
6. Use **Copilot** to generate or debug code with AI
7. Save snapshots in **Version History** to track progress
8. Open the **Whiteboard** to sketch ideas collaboratively

---

## 🌟 Acknowledgements

- [Wandbox](https://wandbox.org/) — Code execution API
- [Groq](https://console.groq.com/) — AI Copilot (LLaMA 3)
- [tldraw](https://tldraw.dev/) — Collaborative whiteboard
- [Socket.io](https://socket.io/) — Real-time communication
- [CodeMirror](https://codemirror.net/) — Code editor engine

---

<div align="center">

If you found this useful, please ⭐ **star the repo** — it helps a lot!

**[🚀 Try DevSync Live →](https://devsync-368a5fbtw-luckysharma06102004-stacks-projects.vercel.app/)**

</div>
