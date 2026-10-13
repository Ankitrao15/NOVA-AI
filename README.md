
# NOVA-AI 🤖

**Your Intelligent AI Assistant | React + FastAPI + Groq**

NOVA-AI is an AI assistant project built with a React frontend and a FastAPI backend. It uses Groq's AI API to generate intelligent responses to user messages through a clean, modern chat interface.

## ✨ Features

- 💬 Interactive AI chat interface
- ⚡ FastAPI backend for handling chat requests
- 🧠 AI-powered responses using the Groq API
- 🎨 Modern, dark-themed React UI
- 🔄 Real-time request and response handling
- 🛡️ Environment variables for API key configuration

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Python
- FastAPI
- Uvicorn
- Groq API

## 📁 Project Structure

```text
NOVA-AI/
├── backend/
│   ├── main.py
│   ├── .env
│   └── venv/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

*Note: The `.env` file and virtual environment should remain local and must not be uploaded to GitHub.*

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/NOVA-AI.git
cd NOVA-AI
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Set Up the Backend

Open a terminal:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install fastapi uvicorn python-dotenv groq
```

Create a `.env` file inside the `backend` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Replace the placeholder with your own Groq API key. Never share or commit this key.

Start the backend:

```powershell
python -m uvicorn main:app --reload
```

Backend URL: http://127.0.0.1:8000

API documentation: http://127.0.0.1:8000/docs

### 3. Set Up the Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL displayed in your terminal, usually:

http://localhost:5173/

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | API key used to access Groq's AI service |

Keep your API key private. Do not upload `.env` files or expose secret keys in frontend code.

## 🗺️ Future Improvements

- Conversation history
- Voice input and text-to-speech
- AI-generated summaries
- User authentication
- Improved error handling and responsive design

## 👨‍💻 Author

**Ankit Yadav**

B.Tech in Computer Science & Engineering

Interested in Python Development, Artificial Intelligence, and Machine Learning.

## 📄 License

A license has not been selected yet. Add one if you want to specify how others may use and distribute this project.
