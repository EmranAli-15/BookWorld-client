import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const outRoutes = ["/login", "/register"];
    const userRoutes = ["/orderProcess", "/user"]
    const adminRoutes = ["/orderProcess", "/user"]

    const authToken = (await cookies()).get("token")?.value;
    let decoded = null;
    if (authToken) {
        decoded = jwtDecode(authToken);
    };

    if (decoded) {
        const result = outRoutes.includes(pathname);
        if (result)
            return NextResponse.redirect(new URL("/", request.url))
        else
            return NextResponse.next()
    }
    else {
        const result = userRoutes.includes(pathname);
        if (result)
            return NextResponse.redirect(new URL("/login", request.url))
        else
            return NextResponse.next()
    }
}