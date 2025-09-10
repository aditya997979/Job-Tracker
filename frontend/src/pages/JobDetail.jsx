import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function JobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [updating, setUpdating] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token')
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      try {
        const { data } = await axios.get(`${baseUrl}/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setJob(data)
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [id])

  const del = async () => {
    if (!confirm('Are you sure you want to delete this job?')) return
    const token = localStorage.getItem('token')
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    await axios.delete(`${baseUrl}/api/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    nav('/jobs')
  }

  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-700',
    'Interview Scheduled': 'bg-yellow-100 text-yellow-700',
    'Interview Completed': 'bg-emerald-100 text-emerald-700',
    'Offer Received': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
    'On Hold': 'bg-gray-100 text-gray-700'
  }

  const statuses = [
    'Applied',
    'Interview Scheduled',
    'Interview Completed',
    'Offer Received',
    'Rejected',
    'On Hold'
  ]

  const updateStatus = async (e) => {
    const value = e.target.value
    setUpdating(true)
    try {
      const token = localStorage.getItem('token')
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const { data } = await axios.patch(`${baseUrl}/api/jobs/${id}/status`, { status: value }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setJob(data)
    } catch (err) {
      console.error(err)
      alert('Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 fade-in">
      {!job ? (
        <div className="glass p-6 sm:p-8 rounded-2xl text-center">
          <p className="text-sm sm:text-base text-gray-500">Loading job details...</p>
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-soft hover:shadow-lift transition-shadow">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{job.title}</h1>
              <p className="text-gray-500 text-sm sm:text-base">{job.company}</p>
              {job.appliedDate && (
                <p className="text-xs text-gray-400 mt-1">
                  Applied on {new Date(job.appliedDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.status] || 'bg-gray-200 text-gray-700'}`}>
                {job.status}
              </span>
              <select disabled={updating} onChange={updateStatus} value={job.status} className="p-2 border rounded-lg w-full sm:w-auto">
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Notes */}
          {job.notes && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Notes
              </h2>
              <p className="text-gray-600 leading-relaxed">{job.notes}</p>
            </div>
          )}

          {/* Tags */}
          {job.tags?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Resume */}
          {job.resumeUrl && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Resume
              </h2>
              <a
                href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${job.resumeUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                📄 View Resume
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
            <button
              onClick={() => nav('/jobs')}
              className="px-4 py-3 sm:py-2 bg-sand-200 hover:bg-sand-300 text-gray-800 rounded-lg transition font-medium"
            >
              ← Back to Jobs
            </button>
            <button
              onClick={del}
              className="px-4 py-3 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition font-medium"
            >
              Delete Job
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
