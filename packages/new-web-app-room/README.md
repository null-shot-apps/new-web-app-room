# Nullshot Jam Tutorial Platform

A web application that transforms public Nullshot Jam sessions into structured tutorials and quizzes for developers and AI-assisted builders.

## Features

### 🎯 Core Functionality
- **Jam Processing**: Paste any public Jam URL to extract content and generate tutorials
- **Course Grid**: Browse available tutorials organized by tech stack and difficulty
- **Interactive Tutorials**: Step-by-step guides with code examples and explanations
- **Knowledge Quizzes**: Test understanding with multiple-choice questions
- **Live Previews**: Embedded webviews of the final applications

### 📚 Course Organization
- **Tech Stack Filtering**: React, Next.js, Vue, Python, and more
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Default Content**: Includes a "Simple Todo List" tutorial to get started

### 🔧 Technical Features
- **AI-Generated Content**: Tutorials and quizzes created from Jam conversations
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Automatic theme switching
- **TypeScript**: Full type safety throughout the application

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Webview & CORS Configuration

This template is configured with **universal CORS and iframe embedding** for maximum compatibility:

### 🌐 Simple Universal Access
- **All Routes & Assets**: Wildcard CORS allowing any origin, method, and headers
- **No File Type Restrictions**: Works with any file format your project uses
- **Iframe Ready**: `Content-Security-Policy: frame-ancestors *` allows embedding in any iframe
- **Webview Ready**: Configured for embedding in any container or webview
- **Development Friendly**: Works across any port, domain, or subdomain

### 🚀 Works Everywhere
- Any localhost port (`localhost:3000`, `localhost:8080`, etc.)
- Any subdomain pattern (`*.localhost`, `*.nullshot.dev`, etc.)
- Webview containers (Electron, VSCode, browser iframes)
- Cross-origin development scenarios
- CDN and edge deployments

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Next.js Environment (for Cloudflare deployment)
NEXTJS_ENV=development

# Optional: Override CORS settings if needed
# CORS_ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


