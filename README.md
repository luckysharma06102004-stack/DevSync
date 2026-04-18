

# 🔁 DevSync

### Real-time Collaborative Code Editor

*Code together. Ship faster.*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Socket.io](https://img.shields.io/badge/Socket.io-ffffff?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## 🚀 What is DevSync?

DevSync is a real-time collaborative code editor where multiple developers can join a shared room, write code together, and see each other's changes instantly — like Google Docs but for code.

---

## ✨ Features

### 👥 Collaboration
- Real-time multi-user code editing with live cursor tracking
- See exactly where each collaborator is typing
- Real-time selection highlighting per user
- User presence list with online/offline status
- Notifications for user join and leave events
- Group chat inside the editor

### 📁 File Management
- Create, open, edit, rename, delete files and folders
- Multi-file support with tabbed editor
- Download entire codebase as a zip file
- Upload local folders directly into the editor

### 💻 Code Editor
- Syntax highlighting with auto-language detection
- Auto-suggestions based on programming language
- Multiple themes for personalized experience
- Customizable font size and font family
- Keyboard shortcuts: `Ctrl+S` to save, `Ctrl+Enter` to run

### ⚡ Code Execution
- Run code directly inside the editor
- Powered by **Wandbox API**
- Supports 20+ languages including JavaScript, Python, Java, C++, Go, Rust and more
- Clean output panel with success/error detection

### 🤖 AI Copilot
- AI-powered code generation using **Groq API (LLaMA 3)**
- Generate code from natural language prompts
- Insert, copy, or replace code in active file
- Proxied through backend to avoid CORS issues

### 🕒 Version History
- Save named snapshots of your code anytime
- Auto-save every 5 minutes
- Restore any previous version instantly
- Persisted in localStorage — survives page refresh

### 🎨 Collaborative Drawing
- Real-time whiteboard powered by **tldraw**
- Switch between coding and drawing mode instantly

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Tailwind CSS |
| Editor | CodeMirror 6 |
| Backend | Node.js, Express |
| Real-time | Socket.io |
| Code Execution | Wandbox API |
| AI Copilot | Groq API (LLaMA 3) |
| Drawing | tldraw |
| Routing | React Router |

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/DevSync.git
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
cd client
npm install

# Server
cd ../server
npm install
```

### 4. Start the servers

Terminal 1 — Backend:
```bash
cd server
npm run dev
```

Terminal 2 — Frontend:
```bash
cd client
npm run dev
```

### 5. Open in browser
http://localhost:5173

---

## 🎯 How to Use

1. Open the app and enter a **Room ID** + **Username**
2. Share the Room ID with teammates
3. Everyone joins the same room and edits code together
4. Use the sidebar to switch between Files, Chat, Copilot, Run Code and Version History
5. Click **Run** to execute code and see output instantly
6. Use **Copilot** to generate code with AI
7. Save snapshots in **Version History** to track your progress

---

## 🌟 Acknowledgements

- [Wandbox](https://wandbox.org/) — Code execution API
- [Groq](https://console.groq.com/) — AI Copilot (LLaMA 3)
- [tldraw](https://tldraw.dev/) — Collaborative drawing
- [Socket.io](https://socket.io/) — Real-time communication
- [CodeMirror](https://codemirror.net/) — Code editor engine

---


If you found this helpful, please ⭐ star the repo!
