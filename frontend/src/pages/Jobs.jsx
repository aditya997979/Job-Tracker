import { useEffect, useState } from 'react'
import axios from 'axios'
import JobCard from '../components/JobCard'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [q, setQ] = useState('')

  const load = async () => {
    const token = localStorage.getItem('token')
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const { data } = await axios.get(`${baseUrl}/api/jobs`, { 
      headers: { Authorization: `Bearer ${token}` }, 
      params: { search: q, limit: 100 }
    })
    setJobs(data.jobs || [])
  }

  useEffect(() => { load() }, [q])

  return (
    <div className="container mx-auto p-4 sm:p-6 fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Job Listings</h1>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mb-6">
        <input 
          placeholder="Search jobs..." 
          value={q} 
          onChange={e => setQ(e.target.value)} 
          className="p-3 border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-amber-450 text-base" 
        />
        <button 
          onClick={load} 
          className="px-6 py-3 sm:px-4 sm:py-2 bg-clay-600 text-white rounded-lg hover:bg-clay-700 transition font-medium"
        >
          Search
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="glass p-6 sm:p-8 rounded-2xl text-center">
          <p className="text-sm sm:text-base text-gray-500">No jobs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {jobs.map(j => (
            <JobCard key={j._id} job={j} />
          ))}
        </div>
      )}
    </div>
  )
}
