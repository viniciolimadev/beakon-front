import { NextRequest, NextResponse } from "next/server";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const apiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL;

    // 1. Register
    const regRes = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const regData = await regRes.json();

    if (!regRes.ok) {
      return NextResponse.json(regData, { status: regRes.status });
    }

    // 2. Auto-login to get the JWT token
    const loginRes = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: body.email, password: body.password }),
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      return NextResponse.json(loginData, { status: loginRes.status });
    }

    const { access_token: token, user } = loginData.data as { access_token: string; user: unknown };

    const response = NextResponse.json({ user, token });
    response.cookies.set("token", token, COOKIE_OPTIONS);

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error in Next.js", details: message },
      { status: 500 }
    );
  }
}
