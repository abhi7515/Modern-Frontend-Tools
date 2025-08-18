CSP is like a browser-enforced whitelist for resources. By setting headers,
 we tell the browser exactly which scripts, styles, images, or iframes are allowed.
 The most important protection is disallowing inline scripts and only allowing scripts from 'self'
 or trusted CDNs. With nonces/hashes, even injected scripts won’t run. It doesn’t replace input validation,
 but it’s a strong second line of defense against XSS.

Where to set it?
1.  Web Servers

NGINX

add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://cdn.example.com";

Yes, exactly — in the web server that serves your React build (like NGINX, Apache, etc.).

 The CSP header must be added in the HTTP response of the HTML document (usually index.html in a React SPA).

2.  Backend Code

If you’re running an app server (Node.js, Django, Rails, etc.), set it via middleware:

Express.js (Node)

import helmet from "helmet";

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.example.com"],
    },
  })
);


// Why only the HTML response?

// The browser parses CSP rules when it loads the HTML page.

// After that, the browser enforces those rules on all subsequent requests (scripts, styles, images, iframes, etc.).

// You don’t need to send CSP with every .js or .css file — sending it with the HTML entrypoint response is enough.

server {
    listen 80;
    server_name myapp.com;

    root /usr/share/nginx/html;

    index index.html;

    location / {
        add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://cdn.example.com" always;
        try_files $uri /index.html;
    }
}

If your frontend also calls APIs (e.g., https://api.myapp.com), you need to allow it in CSP:
Content-Security-Policy: default-src 'self'; connect-src 'self' https://api.myapp.com

