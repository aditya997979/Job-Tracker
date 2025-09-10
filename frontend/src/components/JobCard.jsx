import { Link } from 'react-router-dom'

export default function JobCard({ job }){
  const thumb = job.company?.toLowerCase().includes('google')
    ? 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop'
    : job.company?.toLowerCase().includes('microsoft')
    ? 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop'
    : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop'

  return (
    <div className="group bg-white rounded-2xl shadow-soft hover:shadow-lift transition-shadow duration-300 overflow-hidden">
      <div className="relative h-24 sm:h-28 bg-sand-100">
        <img src={thumb} alt="thumbnail" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{job.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{job.company}</p>
          </div>
          <div className="text-xs px-2 py-1 rounded-full bg-sand-100 text-clay-700 border border-sand-200 self-start">{job.status}</div>
        </div>
        <p className="text-xs sm:text-sm mt-3 text-gray-700 line-clamp-2">{job.notes}</p>
        <div className="mt-3 flex gap-1 sm:gap-2 flex-wrap">
          {job.tags?.map(t=> (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-sand-50 text-gray-700 border border-sand-200">{t}</span>
          ))}
        </div>
        <div className="mt-4">
          <Link to={`/jobs/${job._id}`} className="inline-flex items-center text-xs sm:text-sm text-clay-700 hover:text-clay-800 font-medium transition-colors link-underline">View →</Link>
        </div>
      </div>
    </div>
  )
}
