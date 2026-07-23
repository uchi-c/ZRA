import { NextRequest, NextResponse } from "next/server";
import { getUserByToken, SESSION_COOKIE } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }
  const user = await getUserByToken(token);
  return NextResponse.json({ user });
}
