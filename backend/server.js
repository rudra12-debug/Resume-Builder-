const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Resume Builder API is running' });
});

app.post('/api/generate', async (req, res) => {
  try {
    const { formData, jobProfile } = req.body;
    
    res.json({
      success: true,
      message: 'Resume/CV generated successfully',
      data: formData
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
