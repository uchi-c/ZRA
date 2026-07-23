import { NextRequest, NextResponse } from "next/server";
import { createUser, createSession, SESSION_COOKIE } from "@/lib/auth-server";
import type { UserProfile } from "@/lib/types";

function isUniqueViolation(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "23505";
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const profile = body?.profile as UserProfile | undefined;
  const password = body?.password as string | undefined;

  if (!profile?.username || !profile?.email || !password || password.length < 6) {
    return NextResponse.json({ ok: false, error: "Missing or invalid signup details." }, { status: 400 });
  }

  try {
    const user = await createUser({
      username: profile.username,
      email: profile.email,
      password,
      profile,
    });

    const session = await createSession(user.id);
    const response = NextResponse.json({ ok: true, user });
    response.cookies.set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: session.expiresAt,
    });
    return response;
  } catch (err) {
    if (err instanceof Error && err.message === "USERNAME_TAKEN") {
      return NextResponse.json({ ok: false, error: "Username already taken." }, { status: 409 });
    }
    if (isUniqueViolation(err)) {
      return NextResponse.json(
        { ok: false, error: "An account with this email or ID number already exists." },
        { status: 409 }
      );
    }
    console.error("Signup failed", err);
    return NextResponse.json({ ok: false, error: "Signup failed. Please try again." }, { status: 500 });
  }
}
