import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Events(){
  const [events, setEvents] = useState([])
  const [form, setForm] = useState({ title: '', date: '', description: '', jobId: '' })
  const [jobs, setJobs] = useState([])
  const [editingId, setEditingId] = useState(null)

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const auth = { Authorization: `Bearer ${localStorage.getItem('token')}` }

  const load = async () => {
    const { data } = await axios.get(`${baseUrl}/api/events`, { headers: auth })
    setEvents(data)
  }

  const loadJobs = async () => {
    const { data } = await axios.get(`${baseUrl}/api/jobs`, { headers: auth, params: { limit: 100 } })
    setJobs(data.jobs || [])
  }

  useEffect(() => { load(); loadJobs() }, [])

  const resetForm = () => {
    setForm({ title: '', date: '', description: '', jobId: '' })
    setEditingId(null)
  }

  const save = async (e) => {
    e.preventDefault()
    if (!form.title || !form.date) return alert('Title and date are required')
    const payload = { ...form, date: new Date(form.date) }
    if (editingId) {
      await axios.put(`${baseUrl}/api/events/${editingId}`, payload, { headers: auth })
    } else {
      await axios.post(`${baseUrl}/api/events`, payload, { headers: auth })
    }
    await load()
    resetForm()
  }

  const edit = (ev) => {
    setEditingId(ev._id)
    setForm({
      title: ev.title || '',
      date: ev.date ? ev.date.substring(0,10) : '',
      description: ev.description || '',
      jobId: ev.jobId?._id || ''
    })
  }

  const del = async (id) => {
    if (!confirm('Delete this event?')) return
    await axios.delete(`${baseUrl}/api/events/${id}`, { headers: auth })
    await load()
  }

  // Group events by date (yyyy-mm-dd)
  const grouped = events.reduce((acc, ev) => {
    const key = (ev.date || '').substring(0,10)
    acc[key] = acc[key] || []
    acc[key].push(ev)
    return acc
  }, {})
  const dates = Object.keys(grouped).sort()

  return (
    <div className="container mx-auto p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🗓️ Events</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-lift transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{editingId ? 'Edit Event' : 'Add Event'}</h2>
          <form onSubmit={save} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input value={form.title} onChange={e=>setForm({ ...form, title: e.target.value })} className="w-full p-3 border rounded-lg focus:ring focus:ring-amber-450 outline-none" placeholder="e.g. HR Call" required />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Date</label>
              <input type="date" value={form.date} onChange={e=>setForm({ ...form, date: e.target.value })} className="w-full p-3 border rounded-lg focus:ring focus:ring-amber-450 outline-none" required />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Related Job (optional)</label>
              <select value={form.jobId} onChange={e=>setForm({ ...form, jobId: e.target.value })} className="w-full p-3 border rounded-lg focus:ring focus:ring-amber-450 outline-none">
                <option value="">— None —</option>
                {jobs.map(j => (
                  <option key={j._id} value={j._id}>{j.title} • {j.company}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Description</label>
              <textarea value={form.description} onChange={e=>setForm({ ...form, description: e.target.value })} className="w-full p-3 border rounded-lg focus:ring focus:ring-amber-450 outline-none" placeholder="Notes, location, meeting link..." />
            </div>
            <div className="flex gap-2 justify-end">
              {editingId && (
                <button type="button" onClick={resetForm} className="px-4 py-2 bg-sand-200 hover:bg-sand-300 text-gray-800 rounded-lg transition">Cancel</button>
              )}
              <button className="px-4 py-2 bg-clay-600 hover:bg-clay-700 text-white rounded-lg transition">Save</button>
            </div>
          </form>
        </div>

        {/* List by date */}
        <div>
          {dates.length === 0 ? (
            <div className="glass p-8 rounded-2xl text-center text-gray-600">No events yet. Add your first one!</div>
          ) : (
            <div className="space-y-6">
              {dates.map(d => (
                <div key={d} className="bg-white p-5 rounded-2xl shadow-soft">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{new Date(d).toLocaleDateString()}</h3>
                  </div>
                  <div className="space-y-3">
                    {grouped[d].map(ev => (
                      <div key={ev._id} className="flex items-start justify-between border border-sand-200 rounded-xl p-3">
                        <div>
                          <div className="font-medium text-gray-900">{ev.title}</div>
                          {ev.jobId && (
                            <div className="text-xs text-gray-600">{ev.jobId.title} • {ev.jobId.company}</div>
                          )}
                          {ev.description && <div className="text-sm text-gray-700 mt-1">{ev.description}</div>}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={()=>edit(ev)} className="px-3 py-1 rounded-lg bg-sand-100 text-clay-800 hover:bg-sand-200">Edit</button>
                          <button onClick={()=>del(ev._id)} className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



