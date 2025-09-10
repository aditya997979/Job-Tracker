import { useEffect, useState } from 'react'
import axios from 'axios'
import JobCard from '../components/JobCard'

export default function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token')
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const { data } = await axios.get(`${baseUrl}/api/jobs`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setJobs(data.jobs || [])
        setStats(data.stats || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="container mx-auto p-4 sm:p-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-2 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">📊 Dashboard</h1>
        <span className="text-sm sm:text-base text-gray-500">
          Welcome back, {JSON.parse(localStorage.getItem('user'))?.name || 'User'}
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {loading ? (
          [0,1,2].map(i => (
            <div key={i} className="bg-white p-4 sm:p-6 rounded-2xl shadow-soft shimmer h-24 sm:h-28" />
          ))
        ) : (
          <>
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-soft hover:shadow-lift transition-shadow">
              <h3 className="text-xs sm:text-sm text-gray-500">Total Applications</h3>
              <p className="text-2xl sm:text-3xl font-semibold text-clay-600">{jobs.length}</p>
            </div>
            {stats.map((s) => (
              <div
                key={s._id}
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-soft hover:shadow-lift transition-shadow"
              >
                <h3 className="text-xs sm:text-sm text-gray-500 capitalize">{s._id}</h3>
                <p className="text-2xl sm:text-3xl font-semibold text-sand-700">{s.count}</p>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Recent Jobs */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          📝 Recent Applications
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_,i) => (
              <div key={i} className="bg-white rounded-2xl h-48 sm:h-52 shimmer" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="glass p-6 sm:p-8 rounded-2xl text-center">
            <p className="text-sm sm:text-base text-gray-600">No applications yet. Start tracking your jobs!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {jobs.slice(0, 6).map((j) => (
              <JobCard key={j._id} job={j} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
