HttpOnly cookie flag = Makes the cookie inaccessible to JavaScript via document.cookie.

Headers Used:
Set-Cookie: token=abc123;
HttpOnly; Secure;
SameSite=Strict

If a hacker injects malicious JS on your site (XSS), they can’t read your cookie value directly.

But they can still make requests on your behalf (session riding) — so CSRF protection is still needed.
so use csrf protection tokens
CSRF Token = A random, secret, per-session value stored on the server and embedded in pages/forms.
When the client sends a request (POST/PUT/DELETE), the CSRF token must also be included in the request body or headers.

=>   Server generates CSRF token → stores in session → sends to client in page or separate header.

=>  Client sends it back in requests (e.g., in a hidden form field or custom header).

=>  Server checks if the token matches what’s in the session.

=>  If it doesn’t match → block the request.

// using csrf tokens this can be avoided
// You’re logged into bank.com.
// You visit evil.com, which has:
//<img src="https://bank.com/transfer?amount=5000&to=hacker">



Best Security Practices
✅ Security combo I recommend for web apps:

JWT stored in HttpOnly + Secure + SameSite cookie.

CSRF token for state-changing requests.

Short JWT expiry + refresh token system.



How to store JWT inside a cookie

Yes — it’s controlled by the server, not the UI (browser JS can set cookies, but for secure auth, server should do it).

Server-side example (Express.js + cookie

app.post("/login", (req, res) => {
  const token = createJWT({ userId: 123 });
  
  res.cookie("auth_token", token, {
    httpOnly: true,    // JS can't read it
    secure: true,      // HTTPS only
    sameSite: "Strict" // prevent CSRF
  });

  res.send({ message: "Logged in" });
});
Storing JWT in a cookie: Key points

UI control: You can set a cookie via document.cookie in JS, but for security:

It’s safer if the server sets HttpOnly cookies — JS can’t steal them via XSS.

UI can still read JWT from localStorage/sessionStorage, but that’s less safe.

If JWT is inside an HttpOnly cookie, the UI cannot directly access it — the browser sends it automatically with requests.

