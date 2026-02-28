import { NextRequest, NextResponse } from "next/server";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 dias
  path: "/",
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await apiRes.json();

  if (!apiRes.ok) {
    return NextResponse.json(data, { status: apiRes.status });
  }

  const { token, user } = data as { token: string; user: unknown };

  const response = NextResponse.json({ user, token });
  response.cookies.set("token", token, COOKIE_OPTIONS);

  return response;
}
