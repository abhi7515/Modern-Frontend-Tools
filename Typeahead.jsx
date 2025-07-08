import { useState, useRef } from "react";
import "../styles.css";

export default Autocomplete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});
  const debounceRef = useRef(null);

  const handleSearch = async (query) => {
    try {
      if (cache[query]) {
        setResults(cache[query]);
        console.log("Returned from cache", query, cache[query]);
        return;
      }
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}`
      );
      const data = await res.json();
      setCache((prev) => ({ ...prev, [query]: data.recipes }));
      setResults(data.recipes || []);
    } catch (err) {
      console.error("Failed to fetch recipes", err);
    }
  };

  const debouncedSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        handleSearch(value.trim());
      } else {
        setResults([]);
      }
    }, 300);
  };
  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };

  return (
    <div className="search-container">
      <div className="input-wrapper">
        <input
          type="text"
          onChange={debouncedSearch}
          placeholder="Search a recipe"
          value={searchTerm}
        />
        {searchTerm && (
          <button className="clear-btn" onClick={clearSearch}>
            &times;
          </button>
        )}
      </div>
      <div className="results-list">
        {results.map((recipe) => (
          <div className="results-options" key={recipe.id}>
            {recipe.name}
          </div>
        ))}
      </div>
    </div>
  );
};


--------------------------------------------------------------------

  .App {
  font-family: sans-serif;
  text-align: center;
}
.search-container {
  width: 300px;
  margin: 0px auto;
  position: relative;
}
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding: 10px 36px 10px 12px; /* Leave room for clear button */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.search-container input {
  width: 100%;
  padding: 10px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.results-list {
  position: absolute;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  margin: auto;
}

.results-options {
  padding: 10px 12px;
  border: 1px solid black;
  cursor: pointer;
  margin: auto;
}

.results-options:hover {
  background-color: #f5f;
}
.clear-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #888;
  line-height: 1;
}

