# Supabase Database Setup Instructions

## Step 1: Access Your Supabase Dashboard

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project: `bwdbfrrqogycumlhyvvo`

## Step 2: Run the Complete Database Schema

1. In your Supabase dashboard, click on **"SQL Editor"** in the left sidebar
2. Click **"New query"** to create a new SQL query
3. Copy the entire content from the file `supabase_complete_schema.sql` in your project
4. Paste it into the SQL editor
5. Click **"Run"** to execute the script

## Step 3: Verify the Setup

After running the script, you should see:
- ✅ All tables created successfully
- ✅ Default admin user created
- ✅ Sample data inserted
- ✅ Row Level Security enabled
- ✅ All triggers and functions created

## Step 4: Test the Application

1. Your development server is already running on `http://localhost:3002`
2. Navigate to `http://localhost:3002/admin`
3. Login with the default admin credentials:
   - **Email:** `admin@islamiccenter.com`
   - **Password:** `admin123`

## Step 5: Environment Variables (Optional)

If you want to use environment variables instead of hardcoded values, create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://bwdbfrrqogycumlhyvvo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3ZGJmcnJxb2d5Y3VtbGh5dnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0OTUxNzYsImV4cCI6MjA2NjA3MTE3Nn0.d_3QJnRhJBMnYK314R8cqr0dZedhqvRDaWief16xJ1c
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3ZGJmcnJxb2d5Y3VtbGh5dnZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDQ5NTE3NiwiZXhwIjoyMDY2MDcxMTc2fQ.qS4ymH4ZnkVa8XemU2HPRWvOZRRWs7mEgpJ6AgAKA5g
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## What's Included in the Database Schema

### Tables Created:
- ✅ **users** - User accounts and authentication
- ✅ **students** - Student profiles and information
- ✅ **teachers** - Teacher profiles and information
- ✅ **events** - Community and school events
- ✅ **donations** - Donation tracking and management
- ✅ **prayer_times** - Prayer time calculations
- ✅ **islamic_events** - Islamic calendar events
- ✅ **quran_content** - Quran verses and translations
- ✅ **khutbas** - Friday sermons and religious talks
- ✅ **fatwas** - Islamic rulings and Q&A
- ✅ **assignments** - School assignments
- ✅ **assignment_submissions** - Student submissions
- ✅ **attendances** - Student attendance tracking
- ✅ **exam_results** - Student exam results
- ✅ **fee_payments** - Student fee payments
- ✅ **library_books** - Library book catalog
- ✅ **book_loans** - Book borrowing system
- ✅ **contact_messages** - Contact form submissions
- ✅ **notifications** - System notifications
- ✅ **user_notifications** - User notification tracking
- ✅ **roles** - User roles and permissions
- ✅ **user_roles** - User-role assignments
- ✅ **system_settings** - Application configuration
- ✅ **content_management** - Website content

### Features Enabled:
- ✅ **Row Level Security (RLS)** - Data protection
- ✅ **Automatic timestamps** - Created/updated tracking
- ✅ **Indexes** - Optimized query performance
- ✅ **Triggers** - Automated data updates
- ✅ **Default data** - Sample content and admin user

## Troubleshooting

### If you encounter errors:

1. **Permission Errors**: Make sure you're using the service role key for admin operations
2. **Duplicate Tables**: If tables already exist, you may need to drop them first
3. **Extension Errors**: Make sure the required extensions are enabled in your Supabase project

### To reset the database:

1. Go to **Settings** > **Database** in your Supabase dashboard
2. Click **"Reset database"** (⚠️ This will delete all data)
3. Run the SQL script again

## Next Steps

After successful setup:

1. **Test all admin pages** - Navigate through the dashboard
2. **Add sample data** - Create test users, events, and content
3. **Configure settings** - Update system settings as needed
4. **Customize content** - Add your organization's information
5. **Set up email** - Configure email notifications (optional)

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Supabase credentials
3. Ensure all tables were created successfully
4. Check the Supabase logs for any database errors

Your Islamic dashboard is now ready to use! 🎉 