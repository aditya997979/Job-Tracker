import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, enum: ['Applied','Interview','Rejected','Offer'], default: 'Applied' },
  appliedDate: { type: Date, default: Date.now },
  notes: { type: String },
  tags: [{ type: String }],
  resumeUrl: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

jobSchema.index({ title: 'text', company: 'text', tags: 'text' });

export default mongoose.model('Job', jobSchema);
