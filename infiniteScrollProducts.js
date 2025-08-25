import "./styles.css";
import { useState, useEffect, useRef } from "react";

const Product = ({ id, title, price }) => {
  return (
    <div style={styles.product}>
      <div>{id}</div>
      <div>{title}</div>
      <div>{price}</div>
    </div>
  );
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const PAGE_SIZE = 10;
  const loaderRef = useRef(null);

  const fetchProducts = async () => {
    if (isLoading) return;
    if (total !== null && products.length >= total) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${currentIndex}`
      );
      const res = await response.json();
      setProducts((products) => [...products, ...(res.products || [])]);
      setTotal(res.total);
      setCurrentIndex((currentIndex) => currentIndex + PAGE_SIZE);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          fetchProducts();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <div className="App">
      <div>
        {products.map((product, index) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
      <div ref={loaderRef}>{isLoading && "Loading..."}</div>
    </div>
  );
}

const styles = {
  product: {
    height: "100px",
    border: "1px solid black",
    width: "100%",
  },
  loader: {
    height: "100px",
    border: "1px solid black",
    width: "100%",
  },
};
