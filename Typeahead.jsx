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
