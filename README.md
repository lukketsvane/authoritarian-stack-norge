# Maktkartet – Authoritarian Stack Norge

Ein interaktiv visualisering av korleis kapital, media og stat heng saman i Noreg. Utforsk nettverk av makt, svingdører og interesseorganisasjonar.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Analytics**: Vercel Analytics
- **API Integration**: Brønnøysund Registrene (BRREG)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Deploy to Vercel

This project is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel (already done)
2. **Configure project settings** (optional - Vercel auto-detects Next.js):
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
3. **Deploy**: Push to your main branch or click "Deploy" in Vercel dashboard

The project includes:
- `vercel.json` with optimized settings
- `.gitignore` configured for Vercel
- `@vercel/analytics` pre-installed

### Environment Variables

No environment variables are required for basic functionality. The application uses:
- **BRREG API**: Public API (no authentication needed)

## Project Structure

```
├── app/
│   ├── api/brreg/     # API route for BRREG integration
│   ├── layout.tsx     # Root layout with metadata
│   └── page.tsx       # Home page
├── components/        # React components
│   └── maktkartet.tsx # Main visualization component
├── lib/               # Utility functions
│   ├── brreg.ts       # BRREG API integration
│   └── utils.ts       # Helper utilities
└── public/            # Static assets

```

## Features

- Interactive power network visualization
- Real-time data from Norwegian business registry (BRREG)
- Responsive design
- Dark/Light mode support
- SEO optimized with Open Graph metadata

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]
