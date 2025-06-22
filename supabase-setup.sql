-- Islamic Website Database Setup for Supabase
-- Run this script in your Supabase SQL editor

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create tables for Islamic website

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'moderator', 'teacher', 'imam', 'user')),
  student_id TEXT UNIQUE,
  teacher_id TEXT UNIQUE,
  phone TEXT,
  address TEXT,
  date_of_birth DATE,
  profile_image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE IF NOT EXISTS public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  roll_number TEXT UNIQUE NOT NULL,
  class TEXT NOT NULL,
  section TEXT,
  admission_date DATE DEFAULT CURRENT_DATE,
  father_name TEXT NOT NULL,
  mother_name TEXT,
  guardian_phone TEXT NOT NULL,
  emergency_contact TEXT,
  blood_group TEXT,
  medical_info TEXT,
  fee_status TEXT DEFAULT 'PENDING' CHECK (fee_status IN ('PAID', 'PENDING', 'OVERDUE')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers table
CREATE TABLE IF NOT EXISTS public.teachers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  employee_id TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  subjects TEXT NOT NULL, -- JSON string
  qualification TEXT NOT NULL,
  experience INTEGER NOT NULL,
  joining_date DATE DEFAULT CURRENT_DATE,
  salary DECIMAL(10,2),
  is_class_teacher BOOLEAN DEFAULT false,
  class_assigned TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  is_public BOOLEAN DEFAULT true,
  image_url TEXT,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  donor_phone TEXT,
  amount DECIMAL(10,2) NOT NULL,
  donation_type TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED')),
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prayer Times table
CREATE TABLE IF NOT EXISTS public.prayer_times (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  timezone TEXT NOT NULL,
  calculation_method TEXT NOT NULL,
  adjustments TEXT NOT NULL, -- JSON string
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Islamic Events table
CREATE TABLE IF NOT EXISTS public.islamic_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  hijri_date TEXT NOT NULL,
  gregorian_date DATE NOT NULL,
  event_type TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true,
  notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quran Content table
CREATE TABLE IF NOT EXISTS public.quran_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  surah INTEGER NOT NULL,
  ayah INTEGER NOT NULL,
  arabic_text TEXT NOT NULL,
  translation TEXT NOT NULL,
  transliteration TEXT,
  tafsir TEXT,
  category TEXT NOT NULL,
  tags TEXT NOT NULL, -- JSON string
  is_published BOOLEAN DEFAULT false,
  language TEXT NOT NULL,
  translator TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(surah, ayah, language, translator)
);

-- Khutbas table
CREATE TABLE IF NOT EXISTS public.khutbas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  speaker TEXT NOT NULL,
  date DATE NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  language TEXT NOT NULL,
  category TEXT NOT NULL,
  attachments TEXT NOT NULL, -- JSON string
  is_published BOOLEAN DEFAULT false,
  summary TEXT,
  keywords TEXT NOT NULL, -- JSON string
  audience TEXT NOT NULL,
  mosque TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fatwas table
CREATE TABLE IF NOT EXISTS public.fatwas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  questioner TEXT NOT NULL,
  mufti TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  language TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Approved', 'Pending', 'Rejected')),
  tags TEXT NOT NULL, -- JSON string
  references TEXT NOT NULL, -- JSON string
  is_public BOOLEAN DEFAULT true,
  priority TEXT NOT NULL CHECK (priority IN ('Low', 'Medium', 'High')),
  attachments TEXT NOT NULL, -- JSON string
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings table
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_students_roll_number ON public.students(roll_number);
CREATE INDEX IF NOT EXISTS idx_teachers_employee_id ON public.teachers(employee_id);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON public.events(start_date);
CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations(status);
CREATE INDEX IF NOT EXISTS idx_quran_content_surah_ayah ON public.quran_content(surah, ayah);
CREATE INDEX IF NOT EXISTS idx_khutbas_date ON public.khutbas(date);
CREATE INDEX IF NOT EXISTS idx_fatwas_status ON public.fatwas(status);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.islamic_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quran_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.khutbas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fatwas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic policies - you may want to customize these)
-- Users can read their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Public read access for published content
CREATE POLICY "Public read access for published events" ON public.events
  FOR SELECT USING (is_public = true);

CREATE POLICY "Public read access for published quran content" ON public.quran_content
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for published khutbas" ON public.khutbas
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for public fatwas" ON public.fatwas
  FOR SELECT USING (is_public = true);

CREATE POLICY "Public read access for islamic events" ON public.islamic_events
  FOR SELECT USING (is_public = true);

-- Admin full access (you'll need to create a function to check admin role)
CREATE POLICY "Admin full access" ON public.users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert some sample data
INSERT INTO public.system_settings (key, value, description) VALUES
('site_name', 'Islamic Community Platform', 'Website name'),
('site_description', 'A comprehensive Islamic community platform', 'Website description'),
('contact_email', 'admin@islamicplatform.com', 'Contact email'),
('prayer_calculation_method', 'Muslim World League', 'Default prayer calculation method'),
('default_language', 'English', 'Default language for the platform')
ON CONFLICT (key) DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON public.donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prayer_times_updated_at BEFORE UPDATE ON public.prayer_times
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_islamic_events_updated_at BEFORE UPDATE ON public.islamic_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quran_content_updated_at BEFORE UPDATE ON public.quran_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_khutbas_updated_at BEFORE UPDATE ON public.khutbas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fatwas_updated_at BEFORE UPDATE ON public.fatwas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON public.system_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 