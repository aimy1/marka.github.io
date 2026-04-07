// Middleware disabled to support Static Export (output: export).
// Use Cloudflare _redirects for root-level path redirection.
export const config = {
  matcher: [],
};

export default function middleware() {}
