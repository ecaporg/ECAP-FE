import { NextRequest, NextResponse } from 'next/server';
import { getBrowser } from '@/lib/browser-config';
import { tenantKeysServerApi } from '@/lib/api/tenant-keys';

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    service: 'Browser Session Refresh',
    status: 'ready',
    description: 'POST with { refreshURL } to refresh session token',
  });
}

export async function POST(request: NextRequest) {
  try {
    const { refreshURL } = await request.json();
    
    if (!refreshURL) {
      return NextResponse.json(
        { error: 'refreshURL is required' },
        { status: 400 }
      );
    }

    console.log('Starting browser automation for session refresh');

    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.goto(refreshURL, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    const cookies = await page.cookies();
    console.log('Retrieved cookies:', cookies.length);

    const legacyNormandySessionCookie = cookies.find(
      (cookie: { name: string; value: string }) => cookie.name === '_legacy_normandy_session'
    );

    if (legacyNormandySessionCookie?.value) {
      console.log('Session cookie found');

      await tenantKeysServerApi.refreshSessionToken(legacyNormandySessionCookie.value);
      console.log('Session token updated successfully');

      await page.close();
      
      return NextResponse.json({
        success: true,
        sessionToken: legacyNormandySessionCookie.value,
        message: 'Session token refreshed successfully'
      });
    } else {
      console.warn('Legacy normandy session cookie not found');
      await page.close();
      
      return NextResponse.json(
        { 
          success: false,
          message: 'Legacy normandy session cookie not found' 
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Browser automation failed:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Browser automation failed',
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 