# Employee Search Dashboard

A modern web application built with Next.js for searching and managing employee applications with advanced filtering capabilities.

## Features

- 🔍 Advanced search and filtering system
- 👥 Detailed employee profiles
- 📄 CV download functionality
- 📱 Responsive design
- ⚡ Real-time updates

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Material UI
- React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd Employee-search-dashboard
```

2. Install dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build and start the production server:

```bash
npm run build
npm run start
```

## Development Tools

The project includes several utilities for code quality:

```bash
# Type checking
npm run compile

# Format code with Prettier and ESLint
npm run format

# Run all checks (linting, prettier, types)
npm run check
```

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── app          # Next.js app directory (Routing)
│   ├── actions.ts   # Server actions
│   ├── components/  # React components
│   ├── providers/   # React Context providers
│   ├── types.ts/    # Public types
│   └── misc.ts      # Utility functions
```

## Notes

- Uses server actions to simulate data fetching and server calls
- Implements responsive design for mobile and desktop views
- Includes real-time filtering and search capabilities
