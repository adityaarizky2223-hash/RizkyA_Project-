/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Role = 'admin' | 'guru' | 'tenaga_kependidikan';

export interface UserProfile {
  id: string;
  email: string;
  role: Role;
  name: string;
  created_at: string;
}

export interface Student {
  id: string;
  nis: string;
  name: string;
  kelas: string;
  created_at: string;
}

export interface Attendance {
  id: string;
  user_id: string; // works for both karyawan(user) and siswa(student) reference in respective tables
  date: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alpa';
  created_at: string;
  recorded_by?: string; // used for student attendance
}
