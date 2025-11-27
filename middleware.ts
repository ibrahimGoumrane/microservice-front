import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { validateAdminAccess } from "@/lib/network/api/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the request is for an admin route
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("token")

    // Redirect to login if no token
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      // Validate admin access using auth service
      const isAdmin = await validateAdminAccess()

      if (!isAdmin) {
        return NextResponse.redirect(new URL("/login", request.url))
      }

      // User is authenticated and is an admin, allow request
      return NextResponse.next()
    } catch (error) {
      // If validation fails, redirect to login
      console.error("Middleware auth error:", error)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes should be processed by this middleware
export const config = {
  matcher: "/admin/:path*",
}
