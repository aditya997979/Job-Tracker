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
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">Job Tracker</Link>
        <div className="space-x-4">
          {token ? (
            <>
              <Link to="/jobs">Jobs</Link>
              <Link to="/add-job">Add Job</Link>
              <button onClick={logout} className="bg-blue-800 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
