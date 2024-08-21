// export { default } from "next-auth/middleware"
import { NextResponse } from "next/server"

import withAuth from "next-auth/middleware"

export default withAuth(function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
        return NextResponse.rewrite(new URL("/auth/login?message=You're are Unauthorized", req.url))
    }

    if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user") {
        return NextResponse.rewrite(new URL("/auth/login?message=You're are Unauthorized", req.url))
    }
},
{
    callbacks: {
        authorized: ({ token }) => !!token
    }
}
)

export const config = { matcher: ["/admin/:path*", "/user/:path*"] }
