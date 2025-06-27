import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const messagesEndRef = useRef(null);

  const fetchChatResponse = async (userMessage) => {
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();
      return `${data?.quote}`;
    } catch {
      return "Something went wrong!";
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => setShowChat(!showChat);

  const handleSend = async () => {
    if (!text && !file) return;

    const userMessage = { id: Date.now(), text: text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setText("");

    const botReply = await fetchChatResponse(text);
    const botMessage = { id: Date.now() + 1, text: botReply, sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);

    // const newMessage = {
    //   id: Date.now(),
    //   text: text || null,
    //   file: file ? { name: file.name, url: URL.createObjectURL(file) } : null,
    // };

    // setMessages([...messages, newMessage]);
    // setText("");
    // setFile(null);
  };
  return (
    <>
      <button style={styles.toggle} onClick={toggleChat}>
        Start Chat
      </button>
      {showChat && (
        <div style={styles.container}>
          <div style={styles.chatBox}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "user" ? "#f0ff33" : "#33ff58",
                }}
              >
                {msg.text && <p style={styles.text}>{msg.text}</p>}
                {msg.file && (
                  <a href={msg?.file?.url} style={styles.file}>
                    {msg?.file?.name}
                  </a>
                )}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleSend} style={styles.button}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "2rem auto",
    border: "1px soled #ccc",
    borderRadius: 0,
    padding: 16,
  },
  chatBox: {
    height: 300,
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  message: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 6,
    boxShadow: "0 1px 3px rgba(0 ,0, 0, 0.1)",
  },
  text: {
    margin: 0,
  },
  inputContainer: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 4,
    border: "1px solic #ccc",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#28a7",
    color: "#000",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  toggle: {
    position: "fixed",
    bottom: 50,
    right: 25,
    width: 100,
    height: 50,
    borderRadius: 50,
    color: "#000",
  },
};
