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
