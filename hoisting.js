When the JavaScript engine reads your code, it does it in two phases:

1)  Creation (Hoisting) Phase
    Variables and function declarations are stored in memory.
    But function bodies are not executed yet — they’re just registered.

2)  Execution Phase

    JavaScript runs code line-by-line.

    A function’s body only executes if the function is invoked

    the part ahead of await is treated as a microtask and function execution is paused and line next to await will be added to microtask queue
