import { useEffect, useState } from 'react'
import axios from 'axios'
import JobCard from '../components/JobCard'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [q, setQ] = useState('')

  const load = async () => {
    const token = localStorage.getItem('token')
    const { data } = await axios.get('http://localhost:5000/api/jobs', { 
      headers: { Authorization: `Bearer ${token}` }, 
      params: { search: q, limit: 100 }
    })
    setJobs(data.jobs || [])
  }

  useEffect(() => { load() }, [])

  return (
    <div className="container mx-auto p-6 fade-in">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Job Listings</h1>

      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input 
          placeholder="Search jobs..." 
          value={q} 
          onChange={e => setQ(e.target.value)} 
          className="p-3 border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-amber-450" 
        />
        <button 
          onClick={load} 
          className="px-4 py-2 bg-clay-600 text-white rounded-lg hover:bg-clay-700 transition"
        >
          Search
        </button>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(j => (
            <JobCard key={j._id} job={j} />
          ))}
        </div>
      )}
    </div>
  )
}
