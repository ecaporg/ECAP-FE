import { NextRequest, NextResponse } from 'next/server';
import { routes } from './constants/routes';
import { getUser } from './lib/get-user';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAuthRoute = path.startsWith(routes.auth.root);
  const isProtectedRoute =
    path.startsWith(routes.protected.root) ||
    path.startsWith(routes.dashboard.root) ||
    path.startsWith(routes.compliance.root) ||
    path.startsWith(routes.settings.root);

  const user = await getUser();

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL(routes.dashboard.root, request.url));
  }

  if (isProtectedRoute && !user) {
    const callbackUrl = encodeURIComponent(request.url);
    return NextResponse.redirect(
      new URL(`${routes.auth.signIn}?callbackUrl=${callbackUrl}`, request.url)
    );
  }

  return NextResponse.next();
}

// Конфігурація шляхів, для яких middleware повинен виконуватись
export const config ={
  matcher: [
    /^\/dashboard\/.*/,
    /^\/compliance\/.*/,
    /^\/settings\/.*/,
    /^\/protected\/.*/,
  ],
};
