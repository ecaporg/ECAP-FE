#!/usr/bin/env node

/**
 * Install Chrome for local development
 * This script is only needed for local development where we don't use @sparticuz/chromium
 */

const puppeteer = require('puppeteer');

async function installChrome() {
  try {
    console.log('Installing Chrome for local development...');
    
    // This will trigger Chrome download if not present
    const browser = await puppeteer.launch({ headless: true });
    console.log('Chrome installed successfully!');
    await browser.close();
  } catch (error) {
    console.error('Failed to install Chrome:', error);
    console.log('You can manually install Chrome or use the system Chrome.');
  }
}

// Only run if this is not a Vercel environment
if (!process.env.VERCEL && !process.env.CI) {
  installChrome();
} else {
  console.log('Skipping Chrome installation in serverless environment');
} 