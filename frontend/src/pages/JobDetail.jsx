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
      try {
        const { data } = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
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
    await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
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
      const { data } = await axios.patch(`http://localhost:5000/api/jobs/${id}/status`, { status: value }, {
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
    <div className="container mx-auto p-6 fade-in">
      {!job ? (
        <p className="text-gray-500">Loading job details...</p>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-lift transition-shadow">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
              <p className="text-gray-500 text-sm">{job.company}</p>
              {job.appliedDate && (
                <p className="text-xs text-gray-400 mt-1">
                  Applied on {new Date(job.appliedDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.status] || 'bg-gray-200 text-gray-700'}`}>
                {job.status}
              </span>
              <select disabled={updating} onChange={updateStatus} value={job.status} className="p-2 border rounded-lg">
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
                href={`http://localhost:5000${job.resumeUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                📄 View Resume
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={() => nav('/jobs')}
              className="px-4 py-2 bg-sand-200 hover:bg-sand-300 text-gray-800 rounded-lg transition"
            >
              ← Back to Jobs
            </button>
            <button
              onClick={del}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
            >
              Delete Job
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
