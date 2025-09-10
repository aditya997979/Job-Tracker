import express from 'express';
import Event from '../models/Event.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// create event
router.post('/', protect, async (req, res) => {
  try {
    const { title, date, description, jobId } = req.body;
    const event = await Event.create({
      title, date, description, jobId, user: req.user._id
    });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// get all events for user
router.get('/', protect, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { user: req.user._id };
    
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    
    const events = await Event.find(query)
      .populate('jobId', 'title company')
      .sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// get single event
router.get('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, user: req.user._id })
      .populate('jobId', 'title company');
    if (!event) return res.status(404).json({ message: 'Not found' });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// update event
router.put('/:id', protect, async (req, res) => {
  try {
    const { title, date, description, jobId } = req.body;
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, date, description, jobId },
      { new: true }
    ).populate('jobId', 'title company');
    if (!event) return res.status(404).json({ message: 'Not found' });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// delete event
router.delete('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!event) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

