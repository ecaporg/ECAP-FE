# ECAP Frontend

Next.js frontend application for the ECAP compliance system with Puppeteer browser automation.

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. For local development with browser automation (optional):
```bash
npm run setup-dev
```

3. Start the development server:
```bash
npm run dev
```

## Browser Automation

This application uses Puppeteer for browser automation features:

- **Local Development**: Uses `puppeteer` with local Chrome installation
- **Vercel Production**: Uses `puppeteer-core` with `@sparticuz/chromium` for serverless compatibility

The application automatically detects the environment and uses the appropriate browser setup.

## Deployment on Vercel

The application is fully configured for Vercel deployment:

1. Push your code to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Environment Variables

Set these in your Vercel project settings:

- `NEXT_PUBLIC_BACKEND_URL` - Backend API URL
- `NEXTAUTH_SECRET` - Authentication secret
- `NEXTAUTH_URL` - Frontend application URL

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run setup-dev` - Install Chrome for local development
- `npm run lint` - Run linter

## Technical Details

### Puppeteer Configuration

- **Local**: Uses system Chrome or downloads Chrome automatically
- **Vercel**: Uses optimized Chromium build from `@sparticuz/chromium`
- **Fallback**: Graceful error handling if browser automation fails

### Vercel Optimizations

- Serverless-compatible Chromium binary
- Webpack externals configuration
- Environment detection for proper browser selection 