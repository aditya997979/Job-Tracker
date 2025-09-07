import { Link } from 'react-router-dom'

export default function JobCard({ job }){
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company}</p>
        </div>
        <div className="text-sm text-indigo-600">{job.status}</div>
      </div>
      <p className="text-sm mt-2">{job.notes}</p>
      <div className="mt-3 flex gap-2">
        {job.tags?.map(t=> <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded">{t}</span>)}
      </div>
      <div className="mt-3">
        <Link to={`/jobs/${job._id}`} className="text-sm text-blue-600 underline">View</Link>
      </div>
    </div>
  )
}
