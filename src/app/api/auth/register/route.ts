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
    const apiRes = await fetch(
      `${apiUrl}/api/auth/register`,
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

    const { token, user } = data.data as { token: string; user: unknown };

    const response = NextResponse.json({ user, token });
    response.cookies.set("token", token, COOKIE_OPTIONS);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error in Next.js", details: error.message },
      { status: 500 }
    );
  }
}
