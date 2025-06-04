import chromium from "@sparticuz/chromium-min";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";

export const dynamic = "force-dynamic";

const remoteExecutablePath =
  "https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar";

let browser: any = null;

async function getBrowser() {
  if (browser) return browser;

  if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production" || process.env.VERCEL) {
    // Optimized args for faster startup and smaller memory footprint
    const args = [
      ...chromium.args,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-features=TranslateUI',
      '--disable-ipc-flooding-protection',
      '--disable-extensions',
      '--disable-default-apps',
      '--disable-sync',
      '--metrics-recording-only',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-background-networking',
    ];

    browser = await puppeteerCore.launch({
      args,
      executablePath: await chromium.executablePath(remoteExecutablePath),
      headless: true,
      timeout: 15000, // Faster timeout for browser launch
      defaultViewport: { width: 1280, height: 720 }, // Smaller viewport
    });
  } else {
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
      headless: true,
      timeout: 10000,
      defaultViewport: { width: 1280, height: 720 },
    });
  }
  
  return browser;
}

// Clear browser cache function for manual cleanup if needed
async function clearBrowser() {
  if (browser) {
    try {
      await browser.close();
    } catch (error) {
      console.error('Error closing browser:', error);
    }
    browser = null;
  }
}

export { getBrowser, clearBrowser }; 