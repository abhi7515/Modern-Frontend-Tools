import "./styles.css";
import { useState, useEffect, useMemo } from "react";

const Product = ({ product }) => {
  return (
    <div style={{ display: "flex", margin: "auto" }}>
      <div style={styles.cell}>{product.product}</div>
      <div style={styles.cell}>{product.quantity}</div>
      <div style={styles.cell}>{product.price}</div>
    </div>
  );
};
export default function App() {
  const [products, setProducts] = useState([
    { product: "Laptop", quantity: 2, price: 800 },
    { product: "Mouse", quantity: 5, price: 20 },
    { product: "Keyboard", quantity: 3, price: 50 },
    { product: "Laptop", quantity: 1, price: 800 },
  ]);
  const [revenue, setRevenue] = useState(0);
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();

  useEffect(() => {
    const result = products.reduce((acc, item) => {
      return (acc = acc + item.quantity * item.price);
    }, 0);
    setRevenue(result);
  }, [products]);

//   const revenue = useMemo(() => {
//   return products.reduce((acc, item) => acc + item.quantity * item.price, 0);
// }, [products]);   using memo will optimize and reduce need for another revenue state and avoid sideeffect and one more render

  const addProduct = () => {
    setProducts((products) => [
      ...products,
      { product: productName, price: productPrice, quantity: 1 },
    ]);
  };
  const handleProduct = (e) => {
    const value = e.target.value.trim();
    setProductName(value);
  };
  const handlePrice = (e) => {
    const value = e.target.value.trim();
    setProductPrice(value);
  };

  return (
    <div className="App">
      <div style={{ margin: "20px" }}>
        <input placeholder="product" onChange={handleProduct} />
        <input placeholder="price" onChange={handlePrice} />
        <button onClick={addProduct}>Add product</button>
      </div>
      {products.length > 0 &&
        products.map((product, idx) => <Product product={product} key={idx} />)}
      <div>{revenue}</div>
    </div>
  );
}

const styles = {
  cell: {
    height: "50px",
    width: "100px",
    border: "1px solid black",
    textAlign: "center",
  },
};
