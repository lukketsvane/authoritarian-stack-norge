# Vercel Deployment Checklist

This document provides a step-by-step guide to deploy the Maktkartet application to Vercel.

## ✅ Pre-Deployment Checklist

### Repository Setup
- [x] Git repository is ready
- [x] `.gitignore` properly configured
- [x] All code committed to the repository
- [x] Build process verified (`npm run build` succeeds)

### Configuration Files
- [x] `vercel.json` configured with optimal settings
- [x] `next.config.mjs` properly configured
- [x] `package.json` has correct build scripts
- [x] Public assets (icons, images) in place

### Dependencies
- [x] All dependencies listed in `package.json`
- [x] `@vercel/analytics` integrated for analytics
- [x] No environment variables required (BRREG API is public)

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Visit Vercel Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"

2. **Import Repository**
   - Select your GitHub repository: `lukketsvane/authoritarian-stack-norge`
   - Click "Import"

3. **Configure Project**
   - Vercel will auto-detect Next.js settings
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (keep default)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)
   - Install Command: `npm install` (auto-filled)

4. **Deploy**
   - Click "Deploy" button
   - Wait for the build to complete (2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Git Push

1. **Connect Repository** (if not already done)
   - In Vercel dashboard, connect your GitHub repository
   - Enable "Automatic Deployments"

2. **Push to Branch**
   ```bash
   git push origin main
   ```
   - Vercel will automatically deploy on push to main branch

### Option 3: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - For production deployment:
   ```bash
   vercel --prod
   ```

## 📋 Post-Deployment

### Verify Deployment
- [ ] Visit your deployment URL
- [ ] Check that the main page loads correctly
- [ ] Test the BRREG API integration (`/api/brreg`)
- [ ] Verify analytics are working (check Vercel Analytics dashboard)
- [ ] Check responsive design on mobile
- [ ] Verify icons and favicons load correctly

### Custom Domain (Optional)
1. Go to your project in Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Performance Optimization
- [ ] Enable Vercel Analytics (already integrated)
- [ ] Check Core Web Vitals in Vercel dashboard
- [ ] Review build logs for any warnings

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify `npm run build` works locally
- Ensure all dependencies are in `package.json`

### Runtime Errors
- Check function logs in Vercel dashboard
- Verify API routes are working
- Check that BRREG API is accessible

### Performance Issues
- Review Vercel Analytics for slow pages
- Check serverless function duration
- Consider adding caching for BRREG API calls

## 📚 Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [BRREG API Documentation](https://data.brreg.no/enhetsregisteret/api/docs/index.html)

## ✨ Current Deployment Status

**Build Status**: ✅ Passing  
**Framework**: Next.js 16.0.10  
**Node Version**: 18+ (recommended)  
**Package Manager**: npm  

The application is ready for deployment!
