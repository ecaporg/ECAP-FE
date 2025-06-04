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
  const startTime = Date.now();
  let page: any = null;
  
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
    page = await browser.newPage();

    // Optimize page settings for faster loading
    await page.setRequestInterception(true);
    page.on('request', (req: any) => {
      // Block unnecessary resources to speed up loading
      if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Faster page loading with shorter timeout
    await page.goto(refreshURL, {
      waitUntil: 'domcontentloaded', // Changed from 'networkidle2' for speed
      timeout: 15000, // Reduced from 30000
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
      page = null;
      
      const duration = Date.now() - startTime;
      console.log(`Browser operation completed in ${duration}ms`);
      
      return NextResponse.json({
        success: true,
        sessionToken: legacyNormandySessionCookie.value,
        message: 'Session token refreshed successfully',
        duration
      });
    } else {
      console.warn('Legacy normandy session cookie not found');
      await page.close();
      page = null;
      
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
    
    // Ensure page is closed on error
    if (page) {
      try {
        await page.close();
      } catch (closeError) {
        console.error('Error closing page:', closeError);
      }
    }
    
    const duration = Date.now() - startTime;
    console.log(`Browser operation failed after ${duration}ms`);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Browser automation failed',
        message: error instanceof Error ? error.message : String(error),
        duration
      },
      { status: 500 }
    );
  }
} 