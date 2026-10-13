
import { useState, useRef, useEffect } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/chat";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text = message) {
    const userMessage = text.trim();

    if (!userMessage || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", content: userMessage },
    ]);
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "NOVA could not respond. Please try again."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply || "I couldn't generate a response.",
        },
      ]);
    } catch (err) {
      setError(
        err.message ||
          "Cannot connect to NOVA. Check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  function startNewChat() {
    if (loading) return;
    setMessages([]);
    setMessage("");
    setError("");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">N</div>
          <span>NOVA</span>
        </div>

        <button className="new-chat" onClick={startNewChat}>
          + New Chat
        </button>

        <nav className="menu">
          <button onClick={startNewChat}>💬 Chats</button>
          <button onClick={() => setError("Image generation is not connected yet.")}>
            🖼️ Images
          </button>
          <button onClick={() => setError("Knowledge features are coming next.")}>
            📚 Knowledge
          </button>
          <button onClick={() => setError("Voice features are coming next.")}>
            🎙️ Voice
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button onClick={() => setError("Settings are coming next.")}>
            ⚙️ Settings
          </button>
          <button onClick={() => setError("Type a message and press Enter to chat.")}>
            ❓ Help
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h2>NOVA</h2>
            <span>AI Assistant</span>
          </div>
          <button className="profile">A</button>
        </header>

        {messages.length === 0 ? (
          <section className="welcome">
            <div className="nova-logo">N</div>
            <h1>
              Hello, I'm <span>NOVA</span>
            </h1>
            <p>Your intelligent AI assistant. Ask me anything.</p>

            <div className="suggestions">
              <button onClick={() => sendMessage("Explain something interesting in simple words.")}>
                💡 Explain something
              </button>
              <button onClick={() => sendMessage("Help me write a Python program.")}>
                💻 Help me code
              </button>
              <button onClick={() => sendMessage("Explain how to analyze data using Python.")}>
                📊 Analyze data
              </button>
              <button onClick={() => sendMessage("Give me five creative project ideas.")}>
                ✨ Generate ideas
              </button>
            </div>
          </section>
        ) : (
          <section className="chat-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`message ${item.role === "user" ? "user-message" : "ai-message"}`}
              >
                <strong>
                  {item.role === "user" ? "You" : "NOVA"}
                </strong>
                <p>{item.content}</p>
              </div>
            ))}

            {loading && (
              <div className="message ai-message">
                <strong>NOVA</strong>
                <p>NOVA is thinking...</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </section>
        )}

        <div className="input-area">
          {error && (
            <p className="chat-error" role="alert">
              {error}
            </p>
          )}

          <form className="input-box" onSubmit={handleSubmit}>
            <button
              className="attach"
              type="button"
              title="Attachments coming soon"
              onClick={() => setError("Attachments are not connected yet.")}
            >
              +
            </button>

            <input
              type="text"
              placeholder="Ask NOVA anything..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={loading}
            />

            <button
              className="voice"
              type="button"
              title="Voice input coming soon"
              onClick={() => setError("Voice input is not connected yet.")}
            >
              🎙️
            </button>

            <button
              className="send"
              type="submit"
              disabled={loading || !message.trim()}
              aria-label="Send message"
            >
              ➤
            </button>
          </form>

          <p>NOVA can make mistakes. Check important information.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
