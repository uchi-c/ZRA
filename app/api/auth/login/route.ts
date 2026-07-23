import { NextRequest, NextResponse } from "next/server";
import { findUserByUsername, verifyPassword, createSession, toAuthUser, SESSION_COOKIE } from "@/lib/auth-server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const username = body?.username as string | undefined;
  const password = body?.password as string | undefined;

  if (!username || !password) {
    return NextResponse.json({ ok: false, error: "Username and password are required." }, { status: 400 });
  }

  const row = await findUserByUsername(username);
  if (!row || !(await verifyPassword(password, row.password_hash))) {
    return NextResponse.json({ ok: false, error: "Invalid username or password." }, { status: 401 });
  }

  const session = await createSession(row.id);
  const user = await toAuthUser(row);

  const response = NextResponse.json({ ok: true, user });
  response.cookies.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: session.expiresAt,
  });
  return response;
}
