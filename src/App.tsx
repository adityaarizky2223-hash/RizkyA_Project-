import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AbsensiKaryawan from './pages/AbsensiKaryawan';
import AbsensiSiswa from './pages/AbsensiSiswa';
import RekapAbsensi from './pages/RekapAbsensi';
import DataSiswa from './pages/DataSiswa';
import UserManagement from './pages/UserManagement';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/app" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Karyawan Routes */}
            <Route path="karyawan/absen" element={<AbsensiKaryawan />} />
            
            {/* Guru Routes */}
            <Route path="siswa/absen" element={<ProtectedRoute allowedRoles={['admin', 'guru']}><AbsensiSiswa /></ProtectedRoute>} />
            <Route path="rekap" element={<ProtectedRoute allowedRoles={['admin', 'guru']}><RekapAbsensi /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="siswa" element={<ProtectedRoute allowedRoles={['admin']}><DataSiswa /></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

