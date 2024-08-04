import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';

function Header() {
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">Social Network</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
            {isLoggedIn() ? (
              <>
                <li><Link to="/posts" className="hover:text-blue-200">Posts</Link></li>
                <li><Link to="/create-post" className="hover:text-blue-200">Create Post</Link></li>
                <li><button onClick={handleLogout} className="hover:text-blue-200">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
                <li><Link to="/register" className="hover:text-blue-200">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;