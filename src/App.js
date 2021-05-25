import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

const URL = "ws://127.0.0.1:8000";

function App() {
  const [user, setUser] = useState('James');
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(new WebSocket(URL));

  const submitMessage = (usr, msg) => {
    const message = {user: usr, message: msg};
    ws.send(JSON.stringify(message));
    setMessages([message, ...messages]);
  }

  useEffect(() => {
    ws.onopen = () => {
      console.log('Websocket connected');
    }

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages([message, ...messages]);
    }
    return () => {
      ws.onclose = () => {
        console.log("WebSocket Disconnected");
        setWs(new WebSocket(URL));
      };
    };
  }, [ws.onmessage, ws.onopen, ws.onclose, messages, ws]);

  return (
    <div>
      <label htmlFor="user">
        Name :
        <input
          type="text"
          id="user"
          placeholder="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </label>

      <ul>
        {messages.reverse().map((message, index) => (
          <li key={index}>
            <b>{message.user}</b>: <em>{message.message}</em>
          </li>
        ))}
      </ul>

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage(user, message);
          setMessage([]);
        }}
      >
        <input
          type="text"
          placeholder={"Type a message ..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value={"Send"} />
      </form>
    </div>
  );
}

export default App;
