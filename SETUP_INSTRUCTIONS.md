# Islamic School & Religious Center - Setup Instructions

## Quick Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://bwdbfrrqogycumlhyvvo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3ZGJmcnJxb2d5Y3VtbGh5dnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0OTUxNzYsImV4cCI6MjA2NjA3MTE3Nn0.d_3QJnRhJBMnYK314R8cqr0dZedhqvRDaWief16xJ1c

# JWT Secret (change this in production)
NEXTAUTH_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development
```

### 2. Database Setup
1. Run the SQL schema in your Supabase SQL Editor:
   - Use `supabase_complete_schema.sql` for the complete schema
   - Or use `supabase-setup.sql` for basic setup

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Initialize Sample Data
Visit `http://localhost:3000/api/setup-sample-data` in your browser or make a POST request to create sample users.

## Sample Login Credentials

After running the setup, you can use these credentials:

### Admin User
- Email: `admin@islamic.com`
- Password: `admin123`

### Teacher User
- Email: `teacher@islamic.com`
- Password: `teacher123`

### Student User
- Email: `student@islamic.com`
- Password: `student123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Testing
- `GET /api/test-db` - Test database connection
- `POST /api/test-db` - Create test user
- `POST /api/setup-sample-data` - Initialize sample data

## Features

### For Students
- View assignments and submit work
- Check grades and attendance
- Access library resources
- View prayer times

### For Teachers
- Create and manage assignments
- Grade student submissions
- Manage class schedules
- Access teaching resources

### For Administrators
- Full system management
- User management
- Content management
- Analytics and reporting

## Troubleshooting

### Login Issues
1. Check if the database is properly set up
2. Verify environment variables are correct
3. Check browser console for errors
4. Ensure the users table exists with correct schema

### Database Connection Issues
1. Verify Supabase URL and API key
2. Check if the database is accessible
3. Ensure RLS policies are configured correctly

### CSS Warnings
The CSS warnings in the console are mostly related to vendor prefixes and are not critical. They don't affect functionality.

## Development Notes

- The application uses Next.js 15 with App Router
- Authentication is handled with JWT tokens and HTTP-only cookies
- Database is Supabase (PostgreSQL)
- Styling is done with Tailwind CSS
- Icons are from Lucide React

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `NEXTAUTH_SECRET`
3. Configure proper CORS settings
4. Set up proper environment variables
5. Deploy to Vercel, Netlify, or your preferred platform 