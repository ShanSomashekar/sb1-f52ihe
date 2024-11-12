import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import ManageSpaces from './pages/admin/ManageSpaces';
import ManageBookings from './pages/admin/ManageBookings';
import Analytics from './pages/admin/Analytics';
import UserDashboard from './pages/user/Dashboard';
import UserBookings from './pages/user/Bookings';
import UserInvoices from './pages/user/Invoices';
import Login from './pages/Login';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/spaces" element={<ManageSpaces />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            
            {/* User Routes */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/bookings" element={<UserBookings />} />
            <Route path="/invoices" element={<UserInvoices />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;