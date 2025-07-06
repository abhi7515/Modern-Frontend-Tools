// The Browser Queries the System APIs
// Browsers have code in their native layer (written in C++ or platform-native code) that:

// On startup and periodically (or when notified by the OS), fetches the system’s preferred color scheme.

// For example:

// Windows: Use Windows API functions like SystemParametersInfo or registry reads.

// macOS: Use Cocoa APIs (NSUserDefaults or NSAppearance).

// Linux: Use settings from desktop environment via D-Bus or other config systems.

// This is done inside the rendering engine (Chromium, Gecko, WebKit).

@media (prefers-color-scheme: dark) {
  body {
    background: black;
    color: white;
  }
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
console.log(mediaQuery.matches); // true if OS prefers dark mode

mediaQuery.addEventListener('change', (event) => {
  console.log('Theme changed:', event.matches ? 'dark' : 'light');
});


Web pages themselves never directly query the OS—this would be a privacy/security problem.
All access is mediated by:

1. The browser’s rendering engine.

2. Standardized APIs (CSS Media Queries, matchMedia).

prefers-color-scheme

// is a CSS media feature that allows your website or app to detect whether the user prefers a light or dark color theme at the system level.

// It lets you automatically adapt your styles to match the user’s system appearance preference.


--------------------------------------------------------------------

js api
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

if (darkModeMediaQuery.matches) {
  console.log('User prefers dark mode!');
} else {
  console.log('User prefers light mode!');
}

// Listen for changes
darkModeMediaQuery.addEventListener('change', (event) => {
  if (event.matches) {
    console.log('Switched to dark mode!');
  } else {
    console.log('Switched to light mode!');
  }
});


