# ECAP Frontend

Next.js frontend application for the ECAP compliance system with Puppeteer browser automation.

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file in the root with:
```bash
NEXT_PUBLIC_APP_DOMAIN=http://localhost:3000/
NEXT_PUBLIC_VERCEL_ENVIRONMENT=development
```

3. Start the development server:
```bash
npm run dev
```

## Browser Automation Setup

This application uses Puppeteer following the best practices for Vercel deployment:

- **Dependencies**: 
  - `puppeteer` - For local development
  - `puppeteer-core` - Lightweight version for production
  - `@sparticuz/chromium-min` - Vercel-compatible Chromium

- **Environment Detection**:
  - **Local**: Uses system Chrome via `puppeteer`
  - **Vercel**: Uses remote Chromium via `puppeteer-core` + `@sparticuz/chromium-min`

## Testing Browser

Test browser functionality:
```
GET /api/browser/test?url=https://example.com
```

## Deployment on Vercel

1. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_VERCEL_ENVIRONMENT=production`
   - Other required environment variables

2. The application automatically detects Vercel environment and uses appropriate browser setup

