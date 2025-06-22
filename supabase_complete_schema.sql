-- Islamic Dashboard Complete Database Schema
-- Run this script in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('STUDENT', 'TEACHER', 'PARENT', 'ADMIN');
CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'HALF_DAY');
CREATE TYPE donation_type AS ENUM ('SADAQAH', 'KHUMS', 'ZAKAT', 'STUDENT_SPONSORSHIP', 'GENERAL', 'BUILDING_FUND');
CREATE TYPE payment_method AS ENUM ('UPI', 'CARD', 'BANK_TRANSFER', 'CASH', 'RAZORPAY', 'CASHFREE');
CREATE TYPE payment_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
CREATE TYPE event_type AS ENUM ('SCHOOL', 'RELIGIOUS', 'COMMUNITY');
CREATE TYPE notification_type AS ENUM ('info', 'warning', 'success', 'error');
CREATE TYPE notification_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE notification_status AS ENUM ('draft', 'scheduled', 'sent', 'failed');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'STUDENT',
    student_id UUID REFERENCES students(id),
    teacher_id UUID REFERENCES teachers(id),
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    profile_image VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    class VARCHAR(20) NOT NULL,
    section VARCHAR(10),
    admission_date DATE DEFAULT CURRENT_DATE,
    father_name VARCHAR(255) NOT NULL,
    mother_name VARCHAR(255),
    guardian_phone VARCHAR(20) NOT NULL,
    emergency_contact VARCHAR(20),
    blood_group VARCHAR(10),
    medical_info TEXT,
    fee_status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers table
CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    subjects TEXT NOT NULL, -- JSON array of subjects
    qualification VARCHAR(255) NOT NULL,
    experience INTEGER DEFAULT 0,
    joining_date DATE DEFAULT CURRENT_DATE,
    salary DECIMAL(10,2),
    is_class_teacher BOOLEAN DEFAULT false,
    class_assigned VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type event_type NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255),
    is_public BOOLEAN DEFAULT true,
    image_url VARCHAR(500),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255),
    donor_phone VARCHAR(20),
    amount DECIMAL(10,2) NOT NULL,
    donation_type donation_type NOT NULL,
    payment_method payment_method NOT NULL,
    transaction_id VARCHAR(255),
    status payment_status DEFAULT 'PENDING',
    message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    receipt_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prayer times table
CREATE TABLE prayer_times (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    calculation_method VARCHAR(50) DEFAULT 'MWL',
    adjustments TEXT, -- JSON object for prayer time adjustments
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Islamic events table
CREATE TABLE islamic_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    hijri_date VARCHAR(20) NOT NULL,
    gregorian_date DATE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    is_public BOOLEAN DEFAULT true,
    notifications BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quran content table
CREATE TABLE quran_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    surah INTEGER NOT NULL,
    ayah INTEGER NOT NULL,
    arabic_text TEXT NOT NULL,
    translation TEXT NOT NULL,
    transliteration TEXT,
    tafsir TEXT,
    category VARCHAR(100),
    tags TEXT, -- JSON array of tags
    is_published BOOLEAN DEFAULT false,
    language VARCHAR(10) DEFAULT 'en',
    translator VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Khutba table
CREATE TABLE khutbas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    speaker VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    duration INTEGER, -- in minutes
    language VARCHAR(10) DEFAULT 'en',
    category VARCHAR(100),
    attachments TEXT, -- JSON array of file URLs
    is_published BOOLEAN DEFAULT false,
    summary TEXT,
    keywords TEXT, -- JSON array of keywords
    audience VARCHAR(100),
    mosque VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fatwa table
CREATE TABLE fatwas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    questioner VARCHAR(255),
    mufti VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(100),
    language VARCHAR(10) DEFAULT 'en',
    status VARCHAR(20) DEFAULT 'PENDING',
    tags TEXT, -- JSON array of tags
    references TEXT, -- JSON array of references
    is_public BOOLEAN DEFAULT false,
    priority VARCHAR(20) DEFAULT 'NORMAL',
    attachments TEXT, -- JSON array of file URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assignments table
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    class VARCHAR(20) NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    max_marks INTEGER NOT NULL,
    instructions TEXT,
    attachments TEXT, -- JSON array of file URLs
    teacher_id UUID REFERENCES teachers(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assignment submissions table
CREATE TABLE assignment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    attachments TEXT, -- JSON array of file URLs
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'SUBMITTED',
    marks INTEGER,
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(assignment_id, user_id)
);

-- Attendance table
CREATE TABLE attendances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status attendance_status NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Exam results table
CREATE TABLE exam_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES teachers(id),
    exam_name VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    max_marks INTEGER NOT NULL,
    obtained_marks INTEGER NOT NULL,
    grade VARCHAR(10),
    remarks TEXT,
    exam_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fee payments table
CREATE TABLE fee_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    fee_type VARCHAR(100) NOT NULL,
    payment_method payment_method NOT NULL,
    transaction_id VARCHAR(255),
    status payment_status DEFAULT 'PENDING',
    due_date DATE NOT NULL,
    paid_date DATE,
    receipt_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Library books table
CREATE TABLE library_books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20),
    category VARCHAR(100),
    language VARCHAR(10) DEFAULT 'en',
    description TEXT,
    cover_image VARCHAR(500),
    total_copies INTEGER DEFAULT 1,
    available_copies INTEGER DEFAULT 1,
    location VARCHAR(100),
    is_ebook BOOLEAN DEFAULT false,
    ebook_url VARCHAR(500),
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Book loans table
CREATE TABLE book_loans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID REFERENCES library_books(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    borrowed_date DATE NOT NULL,
    due_date DATE NOT NULL,
    returned_date DATE,
    status VARCHAR(20) DEFAULT 'BORROWED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'UNREAD',
    priority VARCHAR(20) DEFAULT 'NORMAL',
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type notification_type DEFAULT 'info',
    priority notification_priority DEFAULT 'medium',
    target_audience TEXT, -- JSON array of audience types
    scheduled_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    status notification_status DEFAULT 'draft',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User notifications table (for tracking which users received which notifications)
CREATE TABLE user_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(notification_id, user_id)
);

-- Roles table
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    permissions TEXT, -- JSON array of permission IDs
    user_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles table (many-to-many relationship)
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES users(id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, role_id)
);

-- System settings table
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content management table
CREATE TABLE content_management (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'page', 'section', 'widget'
    section VARCHAR(100), -- 'hero', 'about', 'features', etc.
    language VARCHAR(10) DEFAULT 'en',
    status content_status DEFAULT 'draft',
    order_index INTEGER DEFAULT 0,
    metadata TEXT, -- JSON object for additional data
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_teachers_user_id ON teachers(user_id);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);
CREATE INDEX idx_attendances_user_date ON attendances(user_id, date);
CREATE INDEX idx_exam_results_student ON exam_results(student_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prayer_times_updated_at BEFORE UPDATE ON prayer_times FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_islamic_events_updated_at BEFORE UPDATE ON islamic_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quran_content_updated_at BEFORE UPDATE ON quran_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_khutbas_updated_at BEFORE UPDATE ON khutbas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fatwas_updated_at BEFORE UPDATE ON fatwas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assignment_submissions_updated_at BEFORE UPDATE ON assignment_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_attendances_updated_at BEFORE UPDATE ON attendances FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exam_results_updated_at BEFORE UPDATE ON exam_results FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fee_payments_updated_at BEFORE UPDATE ON fee_payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_library_books_updated_at BEFORE UPDATE ON library_books FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_book_loans_updated_at BEFORE UPDATE ON book_loans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_management_updated_at BEFORE UPDATE ON content_management FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE islamic_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE quran_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE khutbas ENABLE ROW LEVEL SECURITY;
ALTER TABLE fatwas ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_management ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Students policies
CREATE POLICY "Students can view their own profile" ON students
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins and teachers can view students" ON students
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('ADMIN', 'TEACHER')
        )
    );

-- Teachers policies
CREATE POLICY "Teachers can view their own profile" ON teachers
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage teachers" ON teachers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Events policies
CREATE POLICY "Public events are viewable by all" ON events
    FOR SELECT USING (is_public = true);

CREATE POLICY "Admins can manage events" ON events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Donations policies
CREATE POLICY "Users can view their own donations" ON donations
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all donations" ON donations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Assignments policies
CREATE POLICY "Students can view assignments for their class" ON assignments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students WHERE user_id = auth.uid() AND class = assignments.class
        )
    );

CREATE POLICY "Teachers can manage their assignments" ON assignments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM teachers WHERE user_id = auth.uid() AND id = assignments.teacher_id
        )
    );

CREATE POLICY "Admins can manage all assignments" ON assignments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Assignment submissions policies
CREATE POLICY "Students can view their own submissions" ON assignment_submissions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Teachers can view submissions for their assignments" ON assignment_submissions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM assignments a 
            JOIN teachers t ON a.teacher_id = t.id 
            WHERE t.user_id = auth.uid() AND a.id = assignment_submissions.assignment_id
        )
    );

-- Attendance policies
CREATE POLICY "Students can view their own attendance" ON attendances
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Teachers and admins can manage attendance" ON attendances
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('ADMIN', 'TEACHER')
        )
    );

-- Exam results policies
CREATE POLICY "Students can view their own results" ON exam_results
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Teachers can manage results for their subjects" ON exam_results
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM teachers WHERE user_id = auth.uid()
        )
    );

-- Library books policies
CREATE POLICY "Public books are viewable by all" ON library_books
    FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage books" ON library_books
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Book loans policies
CREATE POLICY "Users can view their own loans" ON book_loans
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all loans" ON book_loans
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Contact messages policies
CREATE POLICY "Admins can view all messages" ON contact_messages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Notifications policies
CREATE POLICY "Admins can manage notifications" ON notifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- User notifications policies
CREATE POLICY "Users can view their notifications" ON user_notifications
    FOR SELECT USING (user_id = auth.uid());

-- Roles policies
CREATE POLICY "Admins can manage roles" ON roles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- System settings policies
CREATE POLICY "Admins can manage settings" ON system_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Content management policies
CREATE POLICY "Public content is viewable by all" ON content_management
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage content" ON content_management
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Insert default data

-- Default admin user (password: admin123)
INSERT INTO users (id, email, password, name, role, is_active) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'admin@islamiccenter.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5u.Gi',
    'System Administrator',
    'ADMIN',
    true
);

-- Default roles
INSERT INTO roles (name, description, permissions) VALUES
('Super Admin', 'Full system access', '["*"]'),
('Content Manager', 'Can manage content and events', '["content.*", "events.*", "notifications.*"]'),
('Teacher', 'Can manage students and assignments', '["students.view", "assignments.*", "grades.*", "attendance.*"]'),
('Student', 'Can view assignments and submit work', '["assignments.view", "assignments.submit", "grades.view"]'),
('Parent', 'Can view child progress', '["students.view", "grades.view", "attendance.view"]');

-- Default system settings
INSERT INTO system_settings (key, value, description) VALUES
('site_name', 'Islamic Center', 'Website name'),
('site_description', 'A comprehensive Islamic community center', 'Website description'),
('contact_email', 'info@islamiccenter.com', 'Primary contact email'),
('contact_phone', '+1-234-567-8900', 'Primary contact phone'),
('prayer_calculation_method', 'MWL', 'Prayer time calculation method'),
('default_language', 'en', 'Default language'),
('timezone', 'UTC', 'Default timezone'),
('maintenance_mode', 'false', 'Maintenance mode status');

-- Sample prayer times
INSERT INTO prayer_times (location, latitude, longitude, timezone, calculation_method) VALUES
('Main Mosque', 40.7128, -74.0060, 'America/New_York', 'MWL');

-- Sample Islamic events
INSERT INTO islamic_events (title, description, hijri_date, gregorian_date, event_type) VALUES
('Eid al-Fitr', 'Celebration of breaking the fast', '1 Shawwal', '2024-04-10', 'Religious'),
('Eid al-Adha', 'Feast of the Sacrifice', '10 Dhul Hijjah', '2024-06-17', 'Religious'),
('Laylat al-Qadr', 'Night of Power', '27 Ramadan', '2024-04-06', 'Religious'),
('Islamic New Year', 'Beginning of Hijri year', '1 Muharram', '2024-07-08', 'Religious');

-- Sample content
INSERT INTO content_management (title, content, type, section, status) VALUES
('Welcome to Our Islamic Center', 'Welcome to our community center where we strive to serve the Muslim community with excellence.', 'page', 'hero', 'published'),
('About Us', 'We are dedicated to providing religious, educational, and social services to our community.', 'page', 'about', 'published'),
('Our Services', 'Prayer services, Islamic education, community events, and more.', 'page', 'services', 'published');

-- Create function to update user count in roles
CREATE OR REPLACE FUNCTION update_role_user_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE roles SET user_count = user_count + 1 WHERE id = NEW.role_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE roles SET user_count = user_count - 1 WHERE id = OLD.role_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_role_user_count_trigger
    AFTER INSERT OR DELETE ON user_roles
    FOR EACH ROW EXECUTE FUNCTION update_role_user_count();

-- Create function to send notifications
CREATE OR REPLACE FUNCTION send_notification(
    p_title TEXT,
    p_message TEXT,
    p_type TEXT DEFAULT 'info',
    p_priority TEXT DEFAULT 'medium',
    p_target_audience TEXT DEFAULT '["all"]'
)
RETURNS UUID AS $$
DECLARE
    notification_id UUID;
BEGIN
    INSERT INTO notifications (title, message, type, priority, target_audience, status, created_by)
    VALUES (p_title, p_message, p_type::notification_type, p_priority::notification_priority, p_target_audience, 'sent', auth.uid())
    RETURNING id INTO notification_id;
    
    -- Insert user notifications for target audience
    INSERT INTO user_notifications (notification_id, user_id)
    SELECT notification_id, id FROM users 
    WHERE role = ANY(SELECT jsonb_array_elements_text(p_target_audience::jsonb))
    OR 'all' = ANY(SELECT jsonb_array_elements_text(p_target_audience::jsonb));
    
    RETURN notification_id;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Enable realtime for relevant tables
ALTER PUBLICATION supabase_realtime ADD TABLE events;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE prayer_times;
ALTER PUBLICATION supabase_realtime ADD TABLE islamic_events; 