import React from "react";

const Child = ({ name }) => {
  console.log("Child re-rendered!");
  return <h2>Hello, {name}</h2>;
};

// Wrap with React.memo
export default React.memo(Child);


import React, { useState } from "react";
import Child from "./Child";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
      <Child name="Abhinav" />
    </div>
  );
}
Here, clicking the button increments count, but since Child’s name prop never changes, it will not re-render thanks to React.memo.

Without React.memo, it would re-render every time.

By default, React.memo does a shallow comparison of props.
If you want custom logic (like ignoring certain props), you can pass a second function.

const Child = ({ user }) => {
  console.log("Child re-rendered!");
  return <h2>{user.name}</h2>;
};

// Custom comparison: only re-render if user.id changes
export default React.memo(Child, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id;
});


When NOT to use React.memo

If the component is cheap to render, memoization can actually slow things down.

If props change frequently anyway.

If you’re passing functions as props without useCallback (functions get re-created on every render, so memo won’t help).
