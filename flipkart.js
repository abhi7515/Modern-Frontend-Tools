// Build an n x m grid. When a user clicks a cell, highlight the entire row and column in red

import { useState } from "react";

export default function App() {
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });

  const handleCellClick = (i, j) => {
    setSelectedCell({ row: i, col: j });
  };

  const renderGrid = (x, y) => {
    const grid = [];
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        const isHighlighted = i === selectedCell.row || j === selectedCell.col;
        grid.push(
          <div
            key={`${i}-${j}`}
            onClick={() => handleCellClick(i, j)}
            style={{
              ...styles.cell,
              ...(isHighlighted ? styles.highlight : {}),
            }}
          >
            {i},{j}
          </div>
        );
      }
    }
    return grid;
  };

  return <div style={styles.container}>{renderGrid(10, 10)}</div>;
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 50px)",
    gridTemplateRows: "repeat(10, 50px)",
    gap: "2px",
  },
  cell: {
    width: 50,
    height: 50,
    border: "1px solid #000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
  },
  highlight: {
    backgroundColor: "red",
    color: "white",
  },
};







//what if we are to preserve the state of row and col

import { useState } from "react";

export default function App() {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectedCols, setSelectedCols] = useState(new Set());

  const handleCellClick = (i, j) => {
    setSelectedRows(prev => new Set(prev).add(i));
    setSelectedCols(prev => new Set(prev).add(j));
  };

  const renderGrid = (x, y) => {
    const grid = [];
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        const isHighlighted = selectedRows.has(i) || selectedCols.has(j);
        grid.push(
          <div
            key={`${i}-${j}`}
            onClick={() => handleCellClick(i, j)}
            style={{
              ...styles.cell,
              ...(isHighlighted ? styles.highlight : {}),
            }}
          >
            {i},{j}
          </div>
        );
      }
    }
    return grid;
  };

  return <div style={styles.container}>{renderGrid(10, 10)}</div>;
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 50px)",
    gridTemplateRows: "repeat(10, 50px)",
    gap: "2px",
  },
  cell: {
    width: 50,
    height: 50,
    border: "1px solid #000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
  },
  highlight: {
    backgroundColor: "red",
    color: "white",
  },
};


//implement toggling behavior

import { useState } from "react";

export default function App() {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectedCols, setSelectedCols] = useState(new Set());

  const toggleSetValue = (set, value) => {
    const newSet = new Set(set);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    return newSet;
  };

  const handleCellClick = (i, j) => {
    setSelectedRows(prev => toggleSetValue(prev, i));
    setSelectedCols(prev => toggleSetValue(prev, j));
  };

  const renderGrid = (x, y) => {
    const grid = [];
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        const isHighlighted = selectedRows.has(i) || selectedCols.has(j);
        grid.push(
          <div
            key={`${i}-${j}`}
            onClick={() => handleCellClick(i, j)}
            style={{
              ...styles.cell,
              ...(isHighlighted ? styles.highlight : {}),
            }}
          >
            {i},{j}
          </div>
        );
      }
    }
    return grid;
  };

  return <div style={styles.container}>{renderGrid(10, 10)}</div>;
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 50px)",
    gridTemplateRows: "repeat(10, 50px)",
    gap: "2px",
  },
  cell: {
    width: 50,
    height: 50,
    border: "1px solid #000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
  },
  highlight: {
    backgroundColor: "red",
    color: "white",
  },
};


// React state updates are asynchronous and may be batched. If you do this:

// js
// Copy
// Edit
// setSelectedRows(toggleSetValue(prev, i)); // ❌
// You're assuming prev is the latest state — but it isn't in scope, and even if it were, it might be stale.

// Instead, do this:

// js
// Copy
// Edit
// setSelectedRows(prev => toggleSetValue(prev, i)); // ✅
// This tells React:

// “Give me the most up-to-date value of selectedRows, and I’ll return the next state based on it.”

// 🔁 Analogy:
// Think of it like making changes in a shared Google Doc:

// If everyone edits their own cached copy, they overwrite each other.

// If everyone makes edits based on the latest version, the document stays accurate.

