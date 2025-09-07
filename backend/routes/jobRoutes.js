import express from 'express';
import multer from 'multer';
import path from 'path';
import Job from '../models/Job.js';
import protect from '../middleware/authMiddleware.js';
import { Parser } from 'json2csv';

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});
const upload = multer({ storage });

// create job
router.post('/', protect, upload.single('resume'), async (req, res) => {
  try {
    const { title, company, status, appliedDate, notes, tags } = req.body;
    const tagsArr = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t=>t.trim())) : [];
    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const job = await Job.create({
      title, company, status, appliedDate, notes, tags: tagsArr, resumeUrl, user: req.user._id
    });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// list + search + pagination + stats
router.get('/', protect, async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;
    const query = { user: req.user._id };
    if (status) query.status = status;
    if (search) query.$text = { $search: search };
    const skip = (Number(page) - 1) * Number(limit);
    const jobs = await Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    const total = await Job.countDocuments(query);
    // stats
    const stats = await Job.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json({ jobs, total, page: Number(page), pages: Math.ceil(total / Number(limit)), stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// get one
router.get('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: 'Not found' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// update
router.put('/:id', protect, upload.single('resume'), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.resumeUrl = `/uploads/${req.file.filename}`;
    if (data.tags && typeof data.tags === 'string') data.tags = data.tags.split(',').map(t=>t.trim());
    const job = await Job.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, data, { new: true });
    if (!job) return res.status(404).json({ message: 'Not found' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// delete
router.delete('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// export CSV
router.get('/export/csv', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).lean();
    const fields = ['title','company','status','appliedDate','tags','notes','resumeUrl','createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(jobs);
    res.header('Content-Type', 'text/csv');
    res.attachment('jobs.csv');
    return res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
