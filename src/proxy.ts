import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "auth_session";

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let userSession = null;
  let tokenInvalid = false;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET, { algorithms: ["HS256"] });
      userSession = payload;
    } catch (e) {
      tokenInvalid = true;
    }
  }

  // Jika token sudah EXPIRED / INVALID --> Redirect ke login dan hapus cookies
  if (tokenInvalid) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  const isLoginPage = nextUrl.pathname === "/";

  // Jika BELUM login dan mencoba mengakses halaman terproteksi --> Redirect ke login (/)
  if (!userSession && !isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Jika SUDAH login dan mencoba mengakses halaman Login (/) --> Redirect ke home
  if (userSession && isLoginPage) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Proteksi Khusus Role Admin
  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (userSession?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*", "/kasir/:path*", "/transaksi/:path*", "/arus-kas/:path*", "/dashboard/:path*"],
};
