# 🤖 Chat-Bot-Street — Algorithmic Street-Talk Chatbot

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Senzo13/Chat-Bot-Street?style=social)
![GitHub license](https://img.shields.io/github/license/Senzo13/Chat-Bot-Street)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)

<img src="ChatBot.gif" alt="Chat-Bot-Street Demo" width="220"/>

**A conversational chatbot powered entirely by algorithmic filtering — no AI APIs required.**

[Getting Started](#-getting-started) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Contributing](#-contributing)

</div>

---

## 📖 About

Chat-Bot-Street is a lightweight JavaScript chatbot that uses a custom filtering algorithm to match user questions against a knowledge base and deliver contextual responses — all without relying on external AI services. Its street-talk personality makes conversations fun and engaging.

Users can expand the chatbot's knowledge in real time by submitting new question-answer pairs through a built-in admin panel, making it a community-driven conversational engine.

## ✨ Features

- **Pure Algorithmic Matching** — Finds the best response using string filtering and fuzzy matching, no AI dependency.
- **Street-Talk Personality** — Unique conversational style that stands out from generic bots.
- **Community-Driven Knowledge Base** — Users can add, edit, and delete Q&A entries to grow the bot's vocabulary.
- **Admin Panel** — Built-in dashboard to manage questions, answers, and conversation logs.
- **Search & Filter API** — RESTful endpoints to query and manage the knowledge base.
- **Lightweight & Fast** — Minimal dependencies, runs on a single Express server.
- **ChatGPT-Style UI** — Clean, dark-themed chat interface built with Tailwind CSS.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 18+ |
| **Server** | Express.js 4.x |
| **Transpiler** | Babel (ES modules) |
| **Frontend** | Vanilla JavaScript, Tailwind CSS, Ionic Icons |
| **HTTP Client** | Axios |
| **Data Store** | JSON file-based persistence |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Senzo13/Chat-Bot-Street.git
cd Chat-Bot-Street

# Install dependencies
npm install
```

### Running the App

```bash
# Start the development server
npm run dev
```

The chatbot will be available at **http://localhost:3021**.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm start` | Start the production server |
| `npm run obfuscate` | Obfuscate client-side JavaScript |
| `npm run backup` | Create a backup of JS files |
| `npm run cleaner` | Clean temporary files |

## 💬 Usage

1. Open **http://localhost:3021** in your browser.
2. Type a message in the input field and press the send button.
3. The chatbot matches your input against its knowledge base using algorithmic filtering and returns the best response.
4. Visit **/panel** to manage the Q&A database — add new entries, edit existing ones, or review conversation logs.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/data` | Retrieve all Q&A data |
| `GET` | `/search?q=...` | Search the knowledge base |
| `POST` | `/add` | Add a new Q&A entry |
| `POST` | `/logs` | Log a conversation exchange |
| `PUT` | `/edit/:id` | Edit an existing entry |
| `DELETE` | `/delete/:id` | Remove an entry |

## 🤝 Contributing

Contributions are welcome! Here's how to get involved:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/my-feature`)
3. **Commit** your changes (`git commit -m "Add my feature"`)
4. **Push** to the branch (`git push origin feature/my-feature`)
5. **Open** a Pull Request

Please make sure your code follows the existing style and test your changes before submitting.

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

<div align="center">

Built with ❤️ by [Senzo13](https://github.com/Senzo13)

</div>
