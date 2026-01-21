# Time Tracking Application

A full-stack time tracking application built with Next.js, Express, and PostgreSQL. This application allows users to track their work hours across different projects with a modern, responsive interface.

## Technologies Used

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **date-fns** - Date utility library
- **Sonner** - Toast notifications

### Backend

- **Express.js 5** - Web framework for Node.js
- **TypeScript** - Type-safe JavaScript
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

## Project Structure

```
viso-test-task/
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic
│   │   ├── db/                 # Database schema and client
│   │   └── index.ts            # Application entry point
│   ├── drizzle.config.ts       # Drizzle ORM configuration
│   └── package.json
│
├── frontend/                   # Next.js frontend
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard page
│   │   ├── entry/              # Entry management
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   ├── entry-form.tsx      # Time entry form
│   │   ├── time-entries-table.tsx  # Entries table
│   │   └── header.tsx          # App header
│   ├── lib/                    # Utility functions
│   └── package.json
│
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** database (local or cloud-hosted)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd viso-test-task
```

### 2. Set Up the Backend

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/time_tracker
PORT=8080
```

Replace `username`, `password`, and database name with your PostgreSQL credentials.

#### Set Up the Database

Run the following commands to generate and push the database schema:

```bash
# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push
```

Optional: Open Drizzle Studio to view your database:

```bash
npm run db:studio
```

#### Start the Backend Development Server

```bash
npm run dev
```

The backend server will start at `http://localhost:8080`.

### 3. Set Up the Frontend

#### Install Dependencies

Open a new terminal window:

```bash
cd frontend
npm install
```

#### Start the Frontend Development Server

```bash
npm run dev
```

The frontend application will start at `http://localhost:3000`.

### 4. Access the Application

Open your browser and navigate to:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080

## Available Scripts

### Backend

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:generate` - Generate Drizzle migration files
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio (database GUI)

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### Time Entries

- `POST /time-entries` - Create a new time entry
  - Body: `{ entryDate, project, hours, description }`
- `GET /time-entries` - Get all time entries
  - Query params: `startDate`, `endDate` (optional)

## Database Schema

### time_entries Table

| Column      | Type      | Description              |
| ----------- | --------- | ------------------------ |
| id          | serial    | Primary key              |
| entry_date  | date      | Date of the work entry   |
| project     | text      | Project name             |
| hours       | integer   | Number of hours worked   |
| description | text      | Work description         |
| created_at  | timestamp | Entry creation timestamp |

## Features

- Create time entries with date, project, hours, and description
- View all time entries in a sortable table
- Filter entries by date range
- Responsive design for mobile and desktop
- Form validation with error messages
- Toast notifications for user feedback
- Modern UI with dark/light mode support

## Development Notes

- The backend uses CORS to allow requests from `http://localhost:3000`
- All TypeScript types are properly defined (no `any` types used)
- The application uses React Server Components where possible
- Form validation is handled with Zod schemas
- Database migrations are managed with Drizzle Kit

## Production Deployment

### Backend

1. Set up a PostgreSQL database (e.g., Railway, Neon, Supabase)
2. Set the `DATABASE_URL` environment variable
3. Run `npm run db:push` to set up the schema
4. Build the application: `npm run build`
5. Start the server: `npm start`

### Frontend

1. Set the backend API URL in your environment
2. Build the application: `npm run build`
3. Start the server: `npm start`

Or deploy to Vercel with one click for automatic builds and deployments.

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check firewall settings if using a remote database

### Port Already in Use

- Backend: Change `PORT` in `.env` file
- Frontend: Next.js will automatically suggest the next available port

### CORS Errors

- Ensure the frontend URL in `backend/src/index.ts` matches your frontend dev server
- For production, update the CORS origin to your deployed frontend URL

## License

This project is open source and available under the MIT License.
