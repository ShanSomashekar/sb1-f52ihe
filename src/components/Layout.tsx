import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Calendar, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  PieChart, 
  Receipt, 
  X,
  User
} from 'lucide-react';

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, text: 'Dashboard' },
    { to: '/admin/spaces', icon: Building2, text: 'Spaces' },
    { to: '/admin/bookings', icon: Calendar, text: 'Bookings' },
    { to: '/admin/analytics', icon: PieChart, text: 'Analytics' },
  ];

  const userLinks = [
    { to: '/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
    { to: '/bookings', icon: Calendar, text: 'My Bookings' },
    { to: '/invoices', icon: Receipt, text: 'Invoices' },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-b from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8" />
              <h1 className="text-xl font-bold">CoWork Hub</h1>
            </div>
            <button onClick={() => setIsOpen(false)} className="md:hidden">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mb-6 px-2">
            <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
              <User className="w-6 h-6" />
              <div>
                <p className="text-sm font-medium">Welcome back</p>
                <p className="text-xs opacity-75">{isAdmin ? 'Administrator' : 'Member'}</p>
              </div>
            </div>
          </div>
          
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-4 py-3 text-white rounded-lg transition-all duration-200 hover:bg-white/10 ${
                  location.pathname === link.to ? 'bg-white/20 shadow-lg' : ''
                }`}
              >
                <link.icon className="w-5 h-5 mr-3" />
                <span>{link.text}</span>
              </Link>
            ))}
            
            <Link 
              to="/login" 
              className="flex items-center px-4 py-3 text-white rounded-lg transition-all duration-200 hover:bg-white/10 mt-8"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-30 md:hidden bg-white p-2 rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main content */}
      <main className="p-4 md:ml-64 transition-all duration-200">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default Layout;