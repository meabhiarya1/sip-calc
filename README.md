# SIP Calculator

A modern, interactive Systematic Investment Plan (SIP) calculator built with React and Vite.

## Features

- 💰 Calculate SIP returns with real-time updates
- 📊 Adjust monthly investment amount (₹500 - ₹1,00,000)
- 📈 Set expected return rate (1% - 30% p.a.)
- ⏱️ Choose investment period (1 - 40 years)
- 🎨 Clean, responsive UI with dark/light mode support
- ⚡ Fast performance with Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

### Preview Production Build

```bash
# Preview the production build
npm run preview
```

## How SIP Works

A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds. This calculator uses the compound interest formula to estimate your returns:

**Formula:** FV = P × [(1 + r)^n - 1] / r × (1 + r)

Where:
- FV = Future Value
- P = Monthly Investment
- r = Monthly Rate of Return
- n = Total number of months

## Project Structure

```
sip-calc/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   │   ├── SIPCalculator.jsx
│   │   └── SIPCalculator.css
│   ├── App.jsx      # Main App component
│   ├── App.css
│   ├── index.css    # Global styles
│   └── main.jsx     # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **CSS3** - Styling with responsive design

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!
