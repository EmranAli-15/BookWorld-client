import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const outRoutes = ["/login", "/register"];
    const userRoutes = ["/user"]
    const adminRoutes = ["/admin", "/adminAllBooks"]
    const authRoutes = ["/orderProcess"]

    const authToken = (await cookies()).get("token")?.value;
    let decoded = null;
    if (authToken) {
        decoded = jwtDecode(authToken) as any;
    };

    if (decoded) {
        const out = outRoutes.includes(pathname);
        const user = userRoutes.includes(pathname);
        const admin = adminRoutes.includes(pathname);

        if (out) {
            return NextResponse.redirect(new URL("/", request.url))
        }
        else if (decoded.role === "user" && admin) {
            return NextResponse.redirect(new URL("/", request.url))
        }
        else if (decoded.role === "admin" && user) {
            return NextResponse.redirect(new URL("/", request.url))
        }
        else {
            return NextResponse.next()
        }
    }
    else {
        const userPath = userRoutes.includes(pathname);
        const adminPath = adminRoutes.includes(pathname);
        const authPath = authRoutes.includes(pathname);
        if (userPath || adminPath || authPath) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    // return NextResponse.redirect(new URL("/", request.url))
}