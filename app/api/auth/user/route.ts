import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth-server';

export async function GET(request: Request) {
  try {
    // Отримуємо cookie з запиту
    const cookieHeader = request.headers.get('cookie');
    let accessToken = null;
    
    if (cookieHeader) {
      // Розбираємо cookie, щоб знайти accessToken
      const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
      const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));
      
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.split('=')[1];
      }
    }
    
    if (!accessToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    
    const user = await getUserFromToken(accessToken);
    
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    
    // Повертаємо користувача без чутливих даних
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roles: user.roles
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
} 