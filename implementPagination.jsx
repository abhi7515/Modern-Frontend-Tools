import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [hasMore, setHasMore] = useState(true);
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(0);

  const Card = ({ data }) => {
    return (
      <div className="card">
        <h3>{data?.title}</h3>
        <div className="author">by: {data?.author}</div>
        <div className="desc">
          <span>points:{data?.points}</span>:<span>{data?.created_at}</span>
        </div>
        <div className="comments">{${data?.children.length} comments}</div>
      </div>
    );
  };
  useEffect(() => {
    console.log(page);
    fetchCards(page);
  }, [page]);

  const fetchCards = async (page) => {
    try {
      const response = await fetch(
        https://hn.algolia.com/api/v1/search?query=news&page=${page}&hitsPerPage=10,
      );
      const data = await response.json();
      console.log(data);
      if (data?.hits.length === 0) {
        setHasMore(false);
      } else {
        console.log(data?.hits);
        setCards((prevCards) => [...prevCards, ...data?.hits]);
      }
    } catch (error) {
      console.log("Error fetching posts...", error);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="App">
      <div className="card-grid">
        {cards.map((item, index) => (
          <Card data={item} />
        ))}
      </div>
      <div>
        {hasMore && (
          <button onClick={loadMore} className="load-more-button">
            Next Page
          </button>
        )}
      </div>
    </div>
  );
}

.App {
  font-family: sans-serif;
  text-align: center;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: center;
}
.card {
  height: 100px;
  width: 150px;
  font-size: 10px;
  border: 2px solid black;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  text-align: center;
}
.author {
  text-align: left;
}
.desc {
  display: flex;
  justify-self: space-between;
  align-items: center;
  gap: 5px;
}
.comments {
  text-align: left;
}
