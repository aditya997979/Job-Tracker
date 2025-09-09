import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddJob() {
  const [form, setForm] = useState({
    title: '',
    company: '',
    status: 'Applied',
    appliedDate: '',
    tags: '',
    notes: ''
  })
  const [file, setFile] = useState(null)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const fd = new FormData()
      Object.keys(form).forEach((k) => fd.append(k, form[k]))
      if (file) fd.append('resume', file)
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5000/api/jobs', fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      nav('/jobs')
    } catch (err) {
      alert(err?.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="flex items-center justify-center p-6 fade-in">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-lift transition-shadow w-full max-w-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">➕ Add Job</h2>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Job Title
          </label>
          <input
            required
            placeholder="e.g. Frontend Developer"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-amber-450 outline-none"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Company
          </label>
          <input
            required
            placeholder="e.g. Google"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-amber-450 outline-none"
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Application Status
          </label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-amber-450 outline-none"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>
        </div>

        {/* Applied Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Applied Date
          </label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-amber-450 outline-none"
            onChange={(e) => setForm({ ...form, appliedDate: e.target.value })}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Tags
          </label>
          <input
            placeholder="e.g. frontend, remote, internship"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-amber-450 outline-none"
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Resume (optional)
          </label>
          <input
            type="file"
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
              file:rounded-lg file:border-0 file:text-sm file:font-semibold 
              file:bg-sand-100 file:text-clay-700 hover:file:bg-sand-200"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Notes
          </label>
          <textarea
            placeholder="e.g. Interview scheduled for Monday"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-amber-450 outline-none"
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end">
          <button className="bg-clay-600 hover:bg-clay-700 text-white px-6 py-2 rounded-lg shadow-md transition">
            Save Job
          </button>
        </div>
      </form>
    </div>
  )
}
