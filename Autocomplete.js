import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { options } from "./options";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (input === "") {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const filtered = options.filter((item) => {
        return item.title.toLowerCase().includes(input.toLowerCase());
      });
      setSuggestions(filtered);
      setLoading(false);
    }, 500);
  }, [input]);

  useEffect(() => {
    console.log(suggestion);
  }, [suggestion]);

  const handleSuggestionClick = (title) => {
    setInput(title);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-container">
      <h3>Autocomplete input</h3>
      <input
        type="text"
        placeholder="Search a movie title"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {loading && <div className="loading">Loading...</div>}
      {!loading && suggestion.length > 0 && (
        <ul className="suggestions">
          {suggestion.map((item, index) => (
            <li key={index} onClick={() => handleSuggestionClick(item.title)}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



---------------App.css--------------
.autocomplete-container {
  width: 300px;
  margin: 50px auto;
}
.loading {
  font-size: 8px;
  color: black;
  margin-top: 4px;
}
.suggestions {
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
}
suggestions li {
  padding: 8px;
  height: 20px;
  width: 100%;
  cursor: pointer;
}
suggestions li:hover {
  background-color: aqua;
}
input {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
}
