import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Job from './models/Job.js';
import bcrypt from 'bcryptjs';

dotenv.config();
const seed = async () => {
  await connectDB();
  await User.deleteMany({});
  await Job.deleteMany({});
  const hashed = await bcrypt.hash('password123', 10);
  const user = await User.create({ name: 'Test User', email: 'test@example.com', password: hashed });
  await Job.insertMany([
    { user: user._id, title: 'Junior Developer', company: 'Acme', status: 'Applied', notes: 'Applied via LinkedIn', tags: ['frontend'] },
    { user: user._id, title: 'Intern', company: 'Beta', status: 'Interview', notes: 'Phone screen done', tags: ['internship'] }
  ]);
  console.log('Seed done. Login: test@example.com / password123');
  process.exit();
};
seed();
