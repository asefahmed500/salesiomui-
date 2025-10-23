# Salesiom - Sales Commission Management Dashboard

A comprehensive dashboard for managing sales records and calculating commissions based on target completion percentages. Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Radix UI.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Project Structure](#project-structure)
- [Core Functionality](#core-functionality)
  - [Commission Calculation Logic](#commission-calculation-logic)
  - [Commission Rate Tiers](#commission-rate-tiers)
  - [Custom Commission Rates](#custom-commission-rates)
- [Components](#components)
- [Data Models](#data-models)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- 📊 **Dashboard Overview**: Visualize sales performance with summary cards and charts
- 💰 **Commission Calculator**: Real-time commission calculation based on sale amount and target completion
- 📈 **Data Visualization**: Interactive charts showing commission distributions and top performers
- 🗂️ **Sales Records Management**: Add, view, and manage sales records
- ⚙️ **Commission Rate Editor**: Customize commission rate tiers
- 📱 **Responsive Design**: Works on all device sizes
- ♿ **Accessibility**: Built with accessibility in mind using Radix UI primitives

## Demo

The application features a clean, modern dashboard interface with:

1. **Summary Cards** displaying total sales, total commission, and average commission
2. **Commission Calculator** for instant commission calculations
3. **Sales Records Table** with sortable columns and filtering
4. **Interactive Charts** showing target completion distribution and top earners
5. **Commission Rate Editor** for customizing rate tiers

## Tech Stack

- **Framework**: [Next.js 15.5.6](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React useState hook
- **Font Optimization**: [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/asefahmed500/salesiomui-.git
   cd salesiom
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
salesiom/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # UI components
│   │   ├── ui/              # Reusable UI primitives
│   │   └── ...              # Feature components
│   └── lib/                 # Utility functions and types
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── ...
```

## Core Functionality

### Commission Calculation Logic

Commissions are calculated based on two primary factors:

1. **Sale Amount**: The monetary value of the sale
2. **Target Completion**: The percentage of sales target achieved by the employee

The calculation formula is:
```
Commission = (Sale Amount × Commission Rate) ÷ 100
```

### Commission Rate Tiers

The system uses a tiered commission structure that rewards higher performance:

| Target Completion | Commission Rate |
|-------------------|-----------------|
| Below 80%         | 0%              |
| 80% - 89%         | 1%              |
| 90% - 99%         | 2%              |
| 100% - 109%       | 3%              |
| 110% - 119%       | 4%              |
| 120% and above    | 5%              |

The system determines the applicable rate by finding the highest threshold that the actual target completion meets or exceeds.

### Custom Commission Rates

The system supports custom commission rates that can override the standard tier system:

- Individual sales records can have custom commission rates
- Useful for special promotions or exceptions
- Set via checkbox in the "Add Sales Record" form

## Components

1. **DashboardHeader**: Application header with "Edit Rates" button
2. **SummaryCards**: Displays key metrics (Total Sales, Total Commission, Average Commission)
3. **CommissionCalculator**: Interactive tool for calculating commissions
4. **SalesTable**: Table view of all sales records with sorting and filtering
5. **CommissionCharts**: Visualizations of commission data (pie chart and bar chart)
6. **CommissionRateEditor**: Modal for editing commission rate tiers
7. **AddSalesRecord**: Form for adding new sales records

## Data Models

### SalesRecord

```typescript
interface SalesRecord {
  employeeId: string
  employeeName: string
  designation: string
  productName: string
  saleAmount: number
  targetCompletion: number
  status: "Sold" | "Not Sold"
  customCommissionRate?: number
}
```

### CommissionRates

```typescript
type CommissionRates = Record<number, number>
```

Example:
```typescript
{
  80: 1,
  90: 2,
  100: 3,
  110: 4,
  120: 5
}
```

## Available Scripts

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm run start`: Runs the built app in production mode
- `npm run lint`: Runs ESLint to check for code issues

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
#