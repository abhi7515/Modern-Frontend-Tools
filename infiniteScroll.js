import { useEffect, useRef, useState, useCallback } from 'react';

const LIMIT = 5;

export default function App() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return;
    const res = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`);
    const data = await res.json();
    setProducts(prev => [...prev, ...data.products]);
    setSkip(prev => prev + LIMIT);
    if (products.length + data.products.length >= data.total) setHasMore(false);
  }, [skip, hasMore, products.length]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // IntersectionObserver to trigger loading more
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchProducts();
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchProducts]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const { scrollTop, clientHeight, scrollHeight } =
  //       document.documentElement;

  //     // When the user is close to bottom (100px threshold)
  //     if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
  //       fetchProducts();
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [isLoading, products.length, total, currentIndex]);


  return (
    <div style={styles.container}>
      {products.map(product => (
        <div key={product.id} style={styles.card}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <strong>${product.price}</strong>
          <p style={styles.meta}>Rating: {product.rating} ⭐</p>
        </div>
      ))}
      {hasMore && <div ref={loaderRef} style={styles.loader}>Loading more...</div>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    maxWidth: '600px',
    margin: 'auto'
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '1rem',
    marginBottom: '1rem',
    width: '100%',
    boxSizing: 'border-box'
  },
  meta: {
    fontSize: '0.875rem',
    color: '#555'
  },
  loader: {
    textAlign: 'center',
    padding: '1rem',
    fontSize: '1rem',
    color: '#777'
  }
};
