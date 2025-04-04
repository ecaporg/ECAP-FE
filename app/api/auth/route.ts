import { NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth-server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    const authResult = await authenticateUser(email, password);
    
    if (!authResult) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const { user, accessToken } = authResult;
    
    // Створюємо відповідь
    const response = NextResponse.json({ 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roles: user.roles
      }
    });
    
    // Встановлюємо cookie через response
    response.cookies.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 днів
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Створюємо відповідь
    const response = NextResponse.json({ success: true });
    
    // Видаляємо cookie через response
    response.cookies.set({
      name: 'accessToken',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0, // Встановлюємо термін дії як 0 для видалення
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
} 