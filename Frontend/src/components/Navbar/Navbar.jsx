import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading'
function Navbar() {
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand - Left Corner */}
          <div className="flex items-center">
            <svg 
              fill="#ffffff" 
              xmlns="http://www.w3.org/2000/svg" 
              width="32px" 
              height="32px" 
              viewBox="0 0 100 100" 
              className="mr-3"
            >
              <g>
                <g>
                  <path d="M46.6,23.7l-2.1-2.1c-0.6-0.6-1.5-0.6-2.1,0L29.2,34.8l-5.3-5.3c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1
                    c-0.6,0.6-0.6,1.5,0,2.1l7.4,7.4c0.6,0.6,1.4,0.9,2.1,0.9c0.8,0,1.5-0.3,2.1-0.9l15.3-15.3C47.1,25.3,47.1,24.3,46.6,23.7z"/>
                </g>
              </g>
              <g>
                <path d="M77,38H51c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h26c1.1,0,2,0.9,2,2v4C79,37.1,78.1,38,77,38z"/>
              </g>
              <g>
                <path d="M77,56H45c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h32c1.1,0,2,0.9,2,2v4C79,55.1,78.1,56,77,56z"/>
              </g>
              <g>
                <path d="M33,56h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v4C35,55.1,34.1,56,33,56z"/>
              </g>
              <g>
                <path d="M33,74h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v4C35,73.1,34.1,74,33,74z"/>
              </g>
              <g>
                <path d="M77,74H45c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h32c1.1,0,2,0.9,2,2v4C79,73.1,78.1,74,77,74z"/>
              </g>
            </svg>
            <h1 className="text-white text-xl font-bold">
              TaskManager
            </h1>
          </div>

          {/* Authentication Buttons - Right Corner */}
          <div className="flex items-center space-x-3">
            {auth.isLoading ? (
                <Loading />
            ) : auth.isLoggedIn ? (
                <>
                    <span className="text-white text-sm hidden sm:block">
                        Welcome, {auth.user?.name || auth.user?.email || 'User'}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link
                        to="/"
                        className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                    >
                        Sign Up
                    </Link>
                </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
