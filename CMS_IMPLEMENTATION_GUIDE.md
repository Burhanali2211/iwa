# Islamic Website CMS Implementation Guide

## Overview
This document outlines the comprehensive Content Management System (CMS) implemented for the Islamic website. The CMS provides a complete admin dashboard with full CRUD operations for all website content.

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (with Supabase integration ready)
- **Authentication**: JWT-based with role-based access control
- **Validation**: Zod for form validation
- **UI Components**: Custom components with Islamic theme

### Authentication & Authorization
- **Roles**: ADMIN, TEACHER, STUDENT, PARENT
- **Protected Routes**: All CMS routes require ADMIN role
- **JWT Tokens**: Secure authentication with httpOnly cookies
- **Middleware**: Route protection at application level

## 📁 CMS Structure

### 1. Main Admin Dashboard (`/admin`)
- **Location**: `src/app/admin/page.tsx`
- **Features**:
  - Overview statistics and metrics
  - Quick access to all CMS sections
  - Recent activity feed
  - User management shortcuts
  - Responsive sidebar navigation

### 2. CMS Overview (`/admin/cms`)
- **Location**: `src/app/admin/cms/page.tsx`
- **Features**:
  - Central hub for all content management
  - Section-wise statistics
  - Quick actions for each content type
  - Recent activity tracking
  - Content health monitoring

### 3. Home Page CMS (`/admin/cms/home`)
- **Location**: `src/app/admin/cms/home/page.tsx`
- **Sections Managed**:
  - Hero Section (`/admin/cms/home/hero`)
  - Features Section
  - Statistics Section
  - Testimonials Section
  - Daily Islamic Content
  - Events Section

#### Hero Section Editor (`/admin/cms/home/hero`)
- **Location**: `src/app/admin/cms/home/hero/page.tsx`
- **Features**:
  - Live preview functionality
  - Content editing (title, subtitle, description)
  - Button configuration (text and links)
  - Background image management
  - Overlay opacity control
  - Validation and error handling

### 4. Religious Content CMS (`/admin/cms/religious`)
- **Location**: `src/app/admin/cms/religious/page.tsx`
- **Content Types**:
  - Islamic Articles
  - Prayer Times
  - Quran Verses and Commentary
  - Khutba (Friday Sermons)
  - Duas (Supplications)
- **Features**:
  - Advanced filtering and search
  - Content status management (published/draft)
  - Featured content marking
  - Author management
  - Category and tag system
  - View and engagement statistics

### 5. Events Management (`/admin/cms/events`)
- **Location**: `src/app/admin/cms/events/page.tsx`
- **Event Types**:
  - Religious Events
  - Educational Programs
  - Community Gatherings
  - Fundraising Events
  - Youth Activities
- **Features**:
  - Event creation and editing
  - Registration management
  - Online/offline event support
  - Attendee tracking
  - Event status monitoring
  - Export functionality

### 6. Library Management (`/admin/cms/library`)
- **Location**: `src/app/admin/cms/library/page.tsx`
- **Features**:
  - Book catalog management
  - Digital resource handling
  - Category organization
  - Availability tracking
  - Borrowing statistics
  - Multi-language support
  - Rating system

### 7. Additional CMS Sections (Planned)
- **School Management**: Courses, announcements, faculty
- **Donation Management**: Campaigns, goals, payment methods
- **Contact Management**: Information, forms, location details

## 🔧 Technical Implementation

### Component Architecture

#### CMSLayout Component
- **Location**: `src/components/admin/CMSLayout.tsx`
- **Purpose**: Consistent layout for all CMS pages
- **Features**:
  - Sidebar navigation
  - Breadcrumb navigation
  - Action buttons area
  - Responsive design

#### AdminSidebar Component
- **Location**: `src/components/admin/AdminSidebar.tsx`
- **Features**:
  - Collapsible navigation
  - Hierarchical menu structure
  - Active state management
  - Mobile-responsive overlay

### API Routes

#### Home Content API
- **Location**: `src/app/api/cms/home/route.ts`
- **Endpoints**:
  - `GET /api/cms/home` - Fetch all home content
  - `PUT /api/cms/home` - Update home content
  - `POST /api/cms/home` - Create new content

#### Hero Section API
- **Location**: `src/app/api/cms/home/hero/route.ts`
- **Features**:
  - Zod validation schema
  - CRUD operations
  - Error handling
  - Data sanitization

### Database Integration

#### Current Status
- Mock data implementation for development
- Prisma ORM integration ready
- Database models defined in `prisma/schema.prisma`

#### Models Used
- `User` - Admin authentication
- `Article` - Religious content
- `Event` - Event management
- `LibraryBook` - Library catalog
- Additional models for comprehensive content management

## 🎨 UI/UX Features

### Design Principles
- **Islamic Theme**: Consistent with website's Islamic aesthetic
- **Clean Interface**: Minimal clutter, intuitive navigation
- **Responsive Design**: Works on all device sizes
- **Accessibility**: Proper contrast and keyboard navigation

### Key UI Components
- **Stats Cards**: Visual representation of key metrics
- **Data Tables**: Sortable, filterable content lists
- **Form Components**: Validated input fields with error handling
- **Modal Dialogs**: Confirmation dialogs and quick actions
- **Preview Functionality**: Live preview of content changes

### Color Scheme
- **Primary**: Green tones (Islamic theme)
- **Secondary**: Blue, purple, orange for categorization
- **Status Colors**: Green (active), yellow (draft), red (inactive)
- **Neutral**: Gray tones for backgrounds and text

## 🔐 Security Features

### Authentication
- JWT token-based authentication
- Role-based access control (RBAC)
- Session management
- Secure cookie handling

### Data Validation
- Zod schema validation on all forms
- Input sanitization
- XSS protection
- CSRF protection (built into Next.js)

### API Security
- Authentication middleware on all CMS routes
- Input validation on all endpoints
- Error handling without information leakage
- Rate limiting ready for implementation

## 📱 Mobile Responsiveness

### Responsive Features
- Mobile-first design approach
- Collapsible sidebar for mobile
- Touch-friendly interface elements
- Optimized table layouts for small screens
- Responsive grid systems

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Environment variables configured

### Installation Steps
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run database migrations: `npx prisma db push`
5. Start development server: `npm run dev`
6. Access admin dashboard: `http://localhost:3000/admin`

### Default Admin Access
- **Development Mode**: Any email/password combination works
- **Production**: Requires proper database setup and user creation

## 🔄 Development Workflow

### Adding New CMS Sections
1. Create page component in `src/app/admin/cms/[section]/`
2. Add API routes in `src/app/api/cms/[section]/`
3. Update sidebar navigation in `AdminSidebar.tsx`
4. Add validation schemas using Zod
5. Implement CRUD operations
6. Add to CMS overview page

### Best Practices
- Use TypeScript for type safety
- Implement proper error handling
- Add loading states for better UX
- Use consistent naming conventions
- Follow the established component structure
- Add proper validation on all forms

## 📊 Features Summary

### Implemented Features ✅
- Complete admin dashboard with sidebar navigation
- Home page content management (Hero section)
- Religious content management system
- Events management system
- Library management system
- User authentication and authorization
- Responsive design and mobile support
- API routes with validation
- Mock data for development

### Planned Features 🔄
- School management CMS
- Donation campaign management
- Contact information management
- Image upload functionality
- Database integration (replace mock data)
- Advanced analytics and reporting
- Content versioning
- Bulk operations
- Export/import functionality

## 🎯 Next Steps

1. **Database Integration**: Replace mock data with actual database operations
2. **Image Upload**: Implement file upload functionality for images
3. **Content Publishing**: Add publish/unpublish workflows
4. **Analytics**: Implement detailed analytics and reporting
5. **Notifications**: Add real-time notifications for content changes
6. **Backup System**: Implement content backup and restore
7. **Multi-language**: Add support for Arabic content management
8. **SEO Management**: Add meta tags and SEO optimization tools

## 📞 Support

For technical support or questions about the CMS implementation:
- Review the code documentation
- Check the API route implementations
- Refer to component prop interfaces
- Follow the established patterns for new features

---

**Note**: This CMS is designed to be culturally appropriate for Islamic content while maintaining modern web development standards and best practices.
