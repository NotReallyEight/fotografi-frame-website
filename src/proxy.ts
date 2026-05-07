import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import appConfig from "@/config";

export function proxy(request: NextRequest) {
  if (!appConfig.maintenance) return NextResponse.next();

  const { pathname } = request.nextUrl;

  const isAllowedRoute = appConfig.maintenanceAllowedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAllowedRoute) return NextResponse.next();

  return NextResponse.redirect(new URL("/maintenance", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.ico|icon-dark.ico|sitemap.xml|robots.txt|maintenance).*)",
  ],
};
