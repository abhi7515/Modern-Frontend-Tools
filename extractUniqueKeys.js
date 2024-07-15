function extractKeys(input) {
    const keysMap = new Map();

    function traverse(value) {
        if (Array.isArray(value)) {
            value.forEach(item => traverse(item));
        } else if (value !== null && typeof value === 'object') {
            Object.keys(value).forEach(key => {
                keysMap.set(key, true);
                traverse(value[key]);
            });
        }
    }

    traverse(input);

    return Array.from(keysMap.keys());
}

const array = [
    { c: [{ d: 5 }] },
    '5',
    { f: 7 },
    { e: { c: [9, { d: 9 }] } },
    [{ k: 1 }, ["highlevel", "marketing"]]
];

const uniqueKeys = extractKeys(array);
console.log(uniqueKeys); // Output: ['c', 'd', 'f', 'e', 'k']
