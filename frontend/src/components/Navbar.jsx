import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-40">
      <div className="app-bg">
        <div className="container mx-auto px-4">
          <div className="glass rounded-2xl mt-3 mb-2 px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-display text-lg font-semibold tracking-wide text-clay-800 hover:opacity-90 transition-opacity">Job Tracker</Link>
            <div className="space-x-2">
          {token ? (
            <>
              <Link to="/jobs" className="px-3 py-2 rounded-lg text-clay-800 hover:bg-white/40 transition link-underline">Jobs</Link>
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
          </div>
        </div>
      </div>
    </nav>
  )
}
