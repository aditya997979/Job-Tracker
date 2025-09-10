import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar(){
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
    setIsMenuOpen(false)
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="sticky top-0 z-40">
      <div className="app-bg">
        <div className="container mx-auto px-4">
          <div className="glass rounded-2xl mt-3 mb-2 px-4 py-3 flex items-center justify-between">
            <Link 
              to="/" 
              className="font-display text-lg font-semibold tracking-wide text-clay-800 hover:opacity-90 transition-opacity"
              onClick={closeMenu}
            >
              Job Tracker
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2">
              {token ? (
                <>
                  <Link to="/jobs" className="px-3 py-2 rounded-lg text-clay-800 hover:bg-white/40 transition link-underline">Jobs</Link>
                  <Link to="/events" className="px-3 py-2 rounded-lg text-clay-800 hover:bg-white/40 transition link-underline">Events</Link>
                  <Link to="/add-job" className="px-3 py-2 rounded-lg text-clay-800 hover:bg-white/40 transition link-underline">Add Job</Link>
                  <button onClick={logout} className="ml-2 bg-clay-600 hover:bg-clay-700 text-white px-4 py-2 rounded-lg transition">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-3 py-2 rounded-lg text-clay-800 hover:bg-white/40 transition link-underline">Login</Link>
                  <Link to="/register" className="px-3 py-2 rounded-lg text-clay-800 hover:bg-white/40 transition link-underline">Register</Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-clay-800 hover:bg-white/40 transition"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden glass rounded-2xl mt-2 mb-3 px-4 py-3 animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col space-y-2">
                {token ? (
                  <>
                    <Link 
                      to="/jobs" 
                      className="px-3 py-3 rounded-lg text-clay-800 hover:bg-white/40 transition link-underline text-center"
                      onClick={closeMenu}
                    >
                      Jobs
                    </Link>
                    <Link 
                      to="/events" 
                      className="px-3 py-3 rounded-lg text-clay-800 hover:bg-white/40 transition link-underline text-center"
                      onClick={closeMenu}
                    >
                      Events
                    </Link>
                    <Link 
                      to="/add-job" 
                      className="px-3 py-3 rounded-lg text-clay-800 hover:bg-white/40 transition link-underline text-center"
                      onClick={closeMenu}
                    >
                      Add Job
                    </Link>
                    <button 
                      onClick={logout} 
                      className="mt-2 bg-clay-600 hover:bg-clay-700 text-white px-4 py-3 rounded-lg transition w-full"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="px-3 py-3 rounded-lg text-clay-800 hover:bg-white/40 transition link-underline text-center"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="px-3 py-3 rounded-lg text-clay-800 hover:bg-white/40 transition link-underline text-center"
                      onClick={closeMenu}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
