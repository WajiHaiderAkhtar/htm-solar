
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory storage simulation (Database replacement for now)
const contacts = [];
const estimates = [];

// API Endpoint: Handle Contact Form Submission
app.post('/api/contact', (req, res) => {
  const { name, phone, requirements } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // Simulate saving to database
  const newContact = {
    id: Date.now(),
    name,
    phone,
    requirements,
    date: new Date().toISOString()
  };
  
  contacts.push(newContact);
  
  console.log('------------------------------------------------');
  console.log('📩 NEW LEAD RECEIVED (Contact Form):');
  console.log(newContact);
  console.log('------------------------------------------------');

  // Simulate network delay for realistic feel
  setTimeout(() => {
    res.status(200).json({ success: true, message: 'Consultation scheduled successfully!' });
  }, 1000);
});

// API Endpoint: Log Calculator Estimates
app.post('/api/estimate', (req, res) => {
  const estimateData = req.body;

  // Simulate saving to database
  const newEstimate = {
    id: Date.now(),
    ...estimateData,
    date: new Date().toISOString()
  };

  estimates.push(newEstimate);

  console.log('------------------------------------------------');
  console.log('☀️ NEW ESTIMATE GENERATED (Calculator):');
  console.log(`Bill: ₹${estimateData.billAmount}, Location: ${estimateData.location}`);
  console.log(`Rec. System: ${estimateData.result.systemSizeKw}kW`);
  console.log('------------------------------------------------');

  setTimeout(() => {
    res.status(200).json({ success: true, message: 'Estimate saved' });
  }, 500);
});

app.listen(PORT, () => {
  console.log(`✅ Backend Server running on http://localhost:${PORT}`);
});
