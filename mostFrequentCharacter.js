function mostFrequentCharacter(str) {
  const charCount = {};

  // Count occurrences of each character
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Find the maximum occurrence count
  let maxCount = 0;
  for (const count of Object.values(charCount)) {
    if (count > maxCount) {
      maxCount = count;
    }
  }

  // Find all characters with the maximum occurrence count
  const mostFrequentChars = [];
  for (const [char, count] of Object.entries(charCount)) {
    if (count === maxCount) {
      mostFrequentChars.push(char);
    }
  }

  // If only one character has the maximum occurrence, return it
  return mostFrequentChars.length === 1 ? mostFrequentChars[0] : mostFrequentChars;
}

// Example usage:
console.log(mostFrequentCharacter("aabbbcc")); // Output: ["b"]
console.log(mostFrequentCharacter("aabbbccc")); // Output: ["b", "c"]
console.log(mostFrequentCharacter("abc")); // Output: ["a", "b", "c"]
