import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

type UserPayload = {
  id: string;
  username: string;
  role: string;
};

export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export const COOKIE_NAME = "auth_session";

export async function encrypt(payload: UserPayload) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("24h").sign(JWT_SECRET);
}

export async function decrypt(token: string) {
  try {
    return await jwtVerify(token, JWT_SECRET, { algorithms: ["HS256"] });
  } catch (error) {
    return null;
  }
}

export async function setSessionCookie(userPayload: UserPayload) {
  const token = await encrypt(userPayload);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await decrypt(token);
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
