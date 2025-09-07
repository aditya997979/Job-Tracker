import { useEffect, useState } from 'react'
import axios from 'axios'
import JobCard from '../components/JobCard'

export default function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [stats, setStats] = useState([])

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios.get('http://localhost:5000/api/jobs', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setJobs(data.jobs || [])
        setStats(data.stats || [])
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [])

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard</h1>
        <span className="text-gray-500">
          Welcome back, {JSON.parse(localStorage.getItem('user'))?.name || 'User'}
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-sm text-gray-500">Total Applications</h3>
          <p className="text-3xl font-semibold text-blue-600">{jobs.length}</p>
        </div>
        {stats.map((s) => (
          <div
            key={s._id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-sm text-gray-500 capitalize">{s._id}</h3>
            <p className="text-3xl font-semibold text-green-600">{s.count}</p>
          </div>
        ))}
      </div>

      {/* Recent Jobs */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          📝 Recent Applications
        </h2>
        {jobs.length === 0 ? (
          <p className="text-gray-500">No applications yet. Start tracking your jobs!</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 6).map((j) => (
              <JobCard key={j._id} job={j} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
