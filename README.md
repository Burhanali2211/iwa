# Islamic School & Religious Center - Full Stack Web Application

A comprehensive, modern web application for Islamic schools and religious centers built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL. This platform provides a complete solution for educational management, religious activities, community engagement, and donation management.

## 🌟 Features

### 🌐 General Website
- **Modern Homepage** with carousel banners for events, daily content, and announcements
- **About Us** section with history, vision, mission, and leadership team
- **Contact Page** with Google Maps integration, multiple contact methods, and WhatsApp support
- **Responsive Design** - fully mobile-friendly across all devices
- **SEO Optimized** with proper metadata and semantic HTML
- **Accessibility** features with ARIA tags and keyboard navigation

### 🕌 Religious Section
- **Majlis/Event Schedule** for Ramadan, Muharram, Wiladat, and other religious events
- **Live Streaming** integration for YouTube/Facebook broadcasts
- **Media Archive** with audio/video gallery (Nohas, Majalis, lectures)
- **Islamic Articles & Blogs** with markdown support and categorization
- **Ask Aalim** feature for religious questions and guidance
- **Khutba Summaries** with PDF upload support (English/Urdu)
- **Daily Islamic Content** including Hadith, Dua, and prayer times

### 🏫 School Management Features
- **Student Login Portal** with homework, marks, timetable, and notifications
- **Teacher Dashboard** for attendance, circular uploads, and grade management
- **Online Admission Form** with file upload and payment integration
- **Fee Payment Portal** with Razorpay/Cashfree integration
- **Public & Private Class Timetables** with real-time updates
- **Online Exam Result System** with secure access controls
- **I-Card Generator** with CSV upload and PDF generation with QR codes
- **Staff Directory** with profile pictures and subject specializations
- **Notice Board** for dynamic news and circulars

### 📚 Digital Library Features
- **Searchable Book Catalog** with advanced filtering options
- **E-Book Access** with PDF downloads and read-only options
- **Book Lending Tracker** for physical library management
- **Monthly Book Recommendations** curated by librarians
- **Digital Resource Management** for multimedia content

### 💰 Donation System
- **Multiple Donation Types** - Sadaqah, Khums, Zakat, Student Sponsorship
- **Secure Payment Gateway** integration (Razorpay/Cashfree)
- **Auto Receipt Generation** with PDF and email delivery
- **Donor Management** with comprehensive admin panel
- **Recurring Donations** with flexible scheduling
- **Financial Transparency** with detailed reporting

### 🎉 Events & Community
- **Event Calendar** with filtering by religious/school events
- **Photo/Video Gallery** organized by category, year, and event
- **Annual Report** uploads and custom pages
- **Blog Section** for student news, events, and announcements
- **Community Forums** for Q&A and discussions

### 🧠 Student Growth & Engagement
- **Daily Rotating Content** - Hadith, Dua, Islamic calendar
- **Quiz Zone** for Islamic and academic knowledge testing
- **Auto Certificate Generator** for events and competitions
- **Progress Tracking** with academic performance charts
- **Achievement System** with badges and recognition

### 📦 Additional Features
- **Islamic Graphic Resources** - wallpapers, flyers for download
- **PDF Notes Upload** system for teachers
- **Multilingual Support** - English/Urdu switcher
- **PWA Ready** for mobile app-like experience
- **Admin Dashboard** for comprehensive content and user management

## 🛠 Technology Stack

### Frontend
- **Next.js 14** with App Router for optimal performance
- **React 18** with modern hooks and patterns
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** for responsive and modern styling
- **Lucide React** for consistent iconography
- **Framer Motion** for smooth animations

### Backend
- **Next.js API Routes** for serverless backend functionality
- **Prisma ORM** for type-safe database operations
- **PostgreSQL** for robust data storage
- **NextAuth.js** for secure authentication
- **bcryptjs** for password hashing

### Additional Libraries
- **React Hook Form** with Yup validation for form management
- **jsPDF & html2canvas** for PDF generation
- **Axios** for API communication
- **date-fns** for date manipulation
- **React Hot Toast** for user notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd islamic-school
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/islamic_school"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Payment Gateways
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
islamic-school/
├── src/
│   ├── app/                    # Next.js 14 App Router pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── donations/         # Donation system
│   │   ├── religious/         # Religious content
│   │   ├── school/            # School management
│   │   ├── library/           # Digital library
│   │   ├── admin/             # Admin dashboard
│   │   └── api/               # API routes
│   └── components/            # Reusable React components
│       ├── layout/            # Layout components
│       ├── ui/                # UI components
│       ├── forms/             # Form components
│       └── home/              # Homepage components
├── lib/                       # Utility functions and configurations
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
└── types/                     # TypeScript type definitions
```

## 🔧 Configuration

### Database Setup
The application uses PostgreSQL with Prisma ORM. The schema includes:

- **User Management** - Students, Teachers, Admins with role-based access
- **Academic System** - Courses, Exams, Results, Attendance
- **Religious Content** - Events, Articles, Media Files
- **Donation System** - Donations, Payments, Receipts
- **Library System** - Books, Issues, Digital Resources

### Payment Gateway Integration
Supports multiple payment methods:
- **Razorpay** for Indian market
- **Cashfree** as alternative payment processor
- **UPI** payments for instant transfers
- **Credit/Debit Cards** with secure processing

### Email Configuration
Set up SMTP for automated emails:
- Welcome emails for new users
- Payment confirmations and receipts
- Event notifications and reminders
- Password reset functionality

## 🎨 Customization

### Styling
- **Tailwind CSS** configuration in `tailwind.config.js`
- **Custom CSS** variables for theme colors
- **Dark mode** support with system preference detection
- **Arabic font** support for Islamic content

### Branding
- Update logo and branding in `components/layout/Header.tsx`
- Modify color scheme in `src/app/globals.css`
- Customize footer information in `components/layout/Footer.tsx`

## 🔐 Security Features

- **Authentication** with NextAuth.js and JWT tokens
- **Role-based Access Control** (Student, Teacher, Admin)
- **Input Validation** with Yup schemas
- **SQL Injection Protection** via Prisma ORM
- **File Upload Security** with type and size validation
- **CSRF Protection** built into Next.js

## 📱 Mobile Responsiveness

- **Mobile-first Design** approach
- **Touch-friendly** interface elements
- **Responsive Navigation** with mobile menu
- **Optimized Images** with Next.js Image component
- **PWA Ready** for app-like mobile experience

## 🌍 Internationalization

- **Multi-language Support** (English/Urdu)
- **RTL Support** for Arabic content
- **Islamic Calendar** integration
- **Prayer Times** display with location-based calculation

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Docker Deployment
```bash
# Build Docker image
docker build -t islamic-school .

# Run container
docker run -p 3000:3000 islamic-school
```

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📊 Analytics & Monitoring

- **Built-in Analytics** for user engagement
- **Performance Monitoring** with Next.js built-in tools
- **Error Tracking** and logging
- **Database Query Optimization** with Prisma insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email**: support@islamicschool.edu
- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Create an issue on GitHub for bug reports

## 🙏 Acknowledgments

- **Islamic Community** for inspiration and requirements
- **Open Source Contributors** for the amazing libraries used
- **Next.js Team** for the excellent framework
- **Vercel** for hosting and deployment platform

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added donation system and payment integration
- **v1.2.0** - Enhanced mobile responsiveness and PWA features
- **v1.3.0** - Added multilingual support and Islamic calendar

---

**Built with ❤️ for the Islamic community**
#   i w a  
 