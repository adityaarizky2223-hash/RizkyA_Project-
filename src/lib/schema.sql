-- To properly use the app, please execute this schema in your Supabase SQL Editor.
-- It maps users and roles, and contains tables for Student and Attendance data.

-- Create custom enum types
CREATE TYPE user_role AS ENUM ('admin', 'guru', 'tenaga_kependidikan');
CREATE TYPE attendance_status AS ENUM ('hadir', 'izin', 'sakit', 'alpa');

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


-- 3. Attendance Karyawan (Employees check-in)
CREATE TABLE attendance_karyawan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status attendance_status NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, date) -- One entry per user per day
);

-- Employee Attendance Policies
ALTER TABLE attendance_karyawan ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Karyawan can view own attendance" ON attendance_karyawan FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Karyawan can insert own attendance" ON attendance_karyawan FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin can manage attendance" ON attendance_karyawan USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 4. Attendance Siswa (Students marked by Guru/Admin)
CREATE TABLE attendance_siswa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status attendance_status NOT NULL,
  recorded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, date) -- One entry per student per day
);

-- Student Attendance Policies
ALTER TABLE attendance_siswa ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins and Gurus can view student attendance" ON attendance_siswa FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
);
CREATE POLICY "Admins and Gurus can insert/update student attendance" ON attendance_siswa FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
);
