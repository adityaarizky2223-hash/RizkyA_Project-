import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DaftarUjian from './pages/DaftarUjian';
import UjianSiswa from './pages/UjianSiswa';
import BankSoal from './pages/BankSoal';
import HasilUjian from './pages/HasilUjian';
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
            
            {/* Ujian Routes */}
            <Route path="ujian" element={<DaftarUjian />} />
            <Route path="ujian/:id" element={<UjianSiswa />} />
            
            {/* Guru / Admin Routes */}
            <Route path="soal" element={<ProtectedRoute allowedRoles={['admin', 'guru']}><BankSoal /></ProtectedRoute>} />
            <Route path="hasil" element={<ProtectedRoute allowedRoles={['admin', 'guru']}><HasilUjian /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="siswa" element={<ProtectedRoute allowedRoles={['admin']}><DataSiswa /></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
            
            {/* Catch-all for inside /app */}
            <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
          </Route>

          {/* Catch-all route to prevent 404s inside the app */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

