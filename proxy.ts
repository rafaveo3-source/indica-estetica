import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/master/:path*",
    "/clinic/:path*",
    "/patient/:path*",
  ],
};