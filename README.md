# WAS Insurance - Travel Insurance Website

A modern, responsive travel insurance website built with Vanilla JavaScript, Vite, and Tailwind CSS.

## Features

- 🎯 **Multi-destination Selection** - Select multiple travel destinations with an intuitive chip-based interface
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- 📊 **Plan Comparison** - Compare VOYAGER and VOYAGER PLUS insurance plans
- 💾 **Session Storage** - Maintains user selections across pages
- ♿ **Accessible** - ARIA labels and keyboard navigation support

## Pages

1. **Landing Page (index.html)** - Hero section with quote form
2. **Quote Page (quote.html)** - Plan comparison and selection
3. **Plan Details (plan-details.html)** - Detailed plan breakdown with optional coverage
4. **Info Page (info.html)** - Travel insurance information with sidebar navigation

## Tech Stack

- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - No framework dependencies
- **PostCSS** - CSS processing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd WasInsurence-Assesment

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
WasInsurence-Assesment/
├── index.html              # Landing page
├── quote.html              # Quote/plan selection page
├── plan-details.html       # Plan details page
├── info.html               # Information page
├── src/
│   ├── style.css          # Main styles with Tailwind
│   └── main.js            # JavaScript functionality
├── public/
│   └── images/            # Image assets
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Key Features Implementation

### Dynamic Destination Selection
- Multi-select dropdown with search/filter
- Chip-based UI for selected destinations
- Session storage for data persistence

### Mobile Responsiveness
- Single-column layout for mobile sidebar
- Optimized progress bar with smaller icons
- Vertically stacked plan cards on mobile
- Proper padding and spacing adjustments

### Form Validation
- Custom JavaScript validation
- Date format validation (DD/MM/YYYY)
- Age input validation
- Required field checks

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Vite configuration
4. Deploy!

### Manual Build

```bash
npm run build
```

The `dist/` folder will contain the production-ready files.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is for assessment purposes.

## Author

Built as part of WAS Insurance assessment.
