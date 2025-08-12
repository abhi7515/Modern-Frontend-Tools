//dynamic accordians

Lazy Loading Optimization: Descriptions are fetched only on demand.

Performance: Only one item open at a time — keeps DOM light.

Separation of Concerns: AccordionItem handles its internal logic and visual state.

Accessibility: Using semantic elements like <button> and headings.

Fallback Handling: Loading indicators for both list and detail fetches.

Clean State Management: No overuse of global state or Redux for local UI state.

Scalability Ready: Easy to plug into actual API (just replace mock with real axios/fetch calls).

// Build an Accordion UI using:

// GET /api/items → returns a list of item IDs and titles.

// GET /api/items/:id → returns the detailed description of an item.

//optionals
Add error handling (e.g., try-catch + error messages).

Add unit tests for the accordion logic using @testing-library/react.

Add animations for smoother expansion using CSS or Framer Motion.

Add keyboard accessibility with arrow keys to navigate items.



// App.js
import React, { useEffect, useState } from "react";

// ✅ MOCK API
const mockListApi = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve([
      { id: 1, title: "Item One" },
      { id: 2, title: "Item Two" },
      { id: 3, title: "Item Three" },
    ]), 500)
  );

const mockDetailApi = (id) =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ description: `This is the description for item ${id}.` }), 700)
  );


const AccordionItem = ({ item, isOpen, onToggle }) => {
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !description) {
      setLoading(true);
      mockDetailApi(item.id)
        .then((data) => setDescription(data.description))
        .finally(() => setLoading(false));
    }
  }, [isOpen, item.id, description]);

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 4, marginBottom: 8 }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "10px",
          fontWeight: "bold",
          backgroundColor: "#f0f0f0",
          border: "none",
        }}
      >
        {item.title}
      </button>
      {isOpen && (
        <div style={{ padding: "10px" }}>
          {loading ? <em>Loading...</em> : <p>{description}</p>}
        </div>
      )}
    </div>
  );
};


const Accordion = () => {
  const [items, setItems] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockListApi()
      .then((data) => setItems(data))
      .finally(() => setLoading(false));
  }, []);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (loading) return <p>Loading list...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
};


export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Accordion List</h2>
      <Accordion />
    </div>
  );
}
