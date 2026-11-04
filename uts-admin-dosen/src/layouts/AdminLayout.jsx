import { Outlet, NavLink, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const navClass = ({ isActive }) => 
    `px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
      isActive ? 'bg-violet-800 text-white' : 'text-violet-100 hover:bg-violet-700'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-violet-600 text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-wide">ADMIN-13602</h1>
            <div className="flex gap-2">
              <NavLink to="/admin/dashboard" className={navClass}>Dashboard</NavLink>
              <NavLink to="/admin/dosen" className={navClass}>Dosen</NavLink>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-white text-violet-700 px-4 py-1.5 rounded-md font-semibold text-sm shadow-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="flex-1 w-full max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
      <footer className="p-6 text-center text-sm text-gray-500 font-medium">
        &copy; 2026 ADMIN-13602. All rights reserved.
      </footer>
    </div>
  );
}