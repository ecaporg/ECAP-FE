import { NextRequest, NextResponse } from 'next/server';
import { routes } from './constants/routes';

const getUserFromToken = async (token: string) => {
    // TODO: add real implementation in feature
  return {
    id: '1',
    email: 'test@test.com',
    role: 'admin',
  };
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isAuthRoute = path.startsWith(routes.auth.root);
  const isProtectedRoute = path.startsWith(routes.protected.root) || 
                           path.startsWith(routes.dashboard.root) || 
                           path.startsWith(routes.compliance.root) || 
                           path.startsWith(routes.settings.root);

  const token = request.cookies.get('accessToken')?.value;
  
  const user = token ? await getUserFromToken(token) : null;
  
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL(routes.dashboard.root, request.url));
  }
  
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL(routes.auth.signIn, request.url));
  }
  
  return NextResponse.next();
}

// Конфігурація шляхів, для яких middleware повинен виконуватись
export const config = {
  matcher: [
    // Захищені маршрути
    `${routes.dashboard.root}/:path*`,
    `${routes.compliance.root}/:path*`,
    `${routes.settings.root}/:path*`,
    `${routes.protected.root}/:path*`,
    // Маршрути авторизації
    `${routes.auth.root}/:path*`,
  ],
}; 