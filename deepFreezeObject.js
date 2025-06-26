function deepFreeze(obj) {
  Object.freeze(obj); // Freeze the current object

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFreeze(obj[key]); // Recursively freeze nested objects
    }
  });

  return obj; // Return the deeply frozen object
}

const person = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "New York"
  }
};

deepFreeze(person);

person.address.city = "Los Angeles"; // This will not work
console.log(person.address.city); // Output: "New York"
