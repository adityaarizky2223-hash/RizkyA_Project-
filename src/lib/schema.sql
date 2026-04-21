-- To properly use the app, please execute this schema in your Supabase SQL Editor.
-- It maps users and roles, and contains tables for Student and Attendance data.

-- Create custom enum types
CREATE TYPE user_role AS ENUM ('admin', 'guru', 'tenaga_kependidikan');

-- 1. Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'guru',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enables RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admin can completely manage profiles" ON profiles USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);


-- 2. Students Table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nis TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  kelas TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Students Policies
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students are viewable by all authenticated users" ON students FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Only admin can manage students" ON students USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);


-- 3. Exam Results Table
CREATE TABLE exam_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  mata_pelajaran TEXT NOT NULL,
  nilai INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Exam Results Policies
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view results" ON exam_results FOR SELECT USING (true);
CREATE POLICY "Admins and Gurus can insert/update results" ON exam_results FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
);
