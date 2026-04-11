import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get("admin_session");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  // Protected admin routes
  if (isAdminRoute && !isLoginPage) {
    if (!adminSession?.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Already logged in, redirect to products
  if (isLoginPage && adminSession?.value) {
    return NextResponse.redirect(new URL("/admin/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};