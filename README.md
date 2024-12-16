
# Plant Care Scheduler App 🌱

A web application for managing plant care, built with the latest tools and technologies to ensure scalability, maintainability, and a seamless user experience.

## Getting Started

## App published in Vercel, it can be accessed through this link:
https://plant-care-scheduler-app.vercel.app/

or 

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features ✨

- **My Plants Page**: View all your plants with details like name, type, watering frequency, last watered date, and next watering date.
- **Watering History Page**: View the watering history for all plants, including dates and related details.
- **Add New Plants**: Easily create new plants with the form powered by React Hook Form and Zod validation.
- **Water Plants**: A button allows you to add a watering record for the current date. 
  - Validations ensure no duplicate watering records for the same plant on the same date.
  - Automatically updates the next watering date and recalculates the plant's status (`OK`, `Overdue`, or `Due Soon`).

## Tech Stack ⚙️

### Frontend
- **[Next.js 14](https://nextjs.org/)**: A React framework for building modern web applications.
- **TypeScript**: Strongly typed JavaScript for better code quality and maintainability.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for building custom designs quickly.
- **[Axios](https://axios-http.com/)**: A promise-based HTTP client for fetching data from the API.
- **React Hooks**: Built-in React hooks like `useState`, `useEffect`, and custom hooks for cleaner state and logic management.
- **React Hook Form**: Simplifies form state management and validation.
- **Zod**: Ensures robust and type-safe form validations.
- **[shadcn/ui](https://ui.shadcn.dev/)**: A set of customizable components for building modern UIs.

## Pages 📄

### My Plants
- Displays a table with details about each plant.
- Allows creating new plants using a form with validation.
- Includes a button to add watering records for plants.

### Watering History
- Displays a history of watering events with details like date and related plant.

## Functional Highlights 🌟

### Adding a Plant
- Uses a form built with React Hook Form and Zod for validation.
- Validates fields like plant name, type, watering frequency, and location.
- Saves data to the backend using Axios.

### Adding a Watering Record
- Each plant row in the "My Plants" page includes a "Water Plant" button.
- Clicking the button:
  - Adds a watering record for the current date.
  - Ensures no duplicate records for the same plant on the same date.
  - Updates the next watering date and recalculates the plant's status (`OK`, `Overdue`, or `Due Soon`).

### Plant Status and Calculations
- **Status**:
  - `OK`: Plant does not need watering.
  - `Due Soon`: Plant needs watering within 2 days.
  - `Overdue`: Plant is past its watering date.
- **Calculations**:
  - Determines the next watering date based on the last watered date and watering frequency.
  - Ensures all status updates are dynamic and reflect the current state of the plant.

## Known Limitations 🛠️
- The "Water Plant" feature automatically adds a record for the current date. There is no option to select a custom date due to time constraints.
- Test coverage is not included but would be implemented using tools like Jest or React Testing Library in future iterations.

