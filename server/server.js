const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// Initialize the Hugging Face summarization pipeline
let summarizer;
(async () => {
  try {
    // Dynamically import the @xenova/transformers library
    const { pipeline } = await import('@xenova/transformers');
    summarizer = await pipeline('summarization', 'Xenova/bart-large-cnn'); // Use a pre-trained model
    console.log('Hugging Face summarization pipeline initialized.');
  } catch (error) {
    console.error('Failed to initialize Hugging Face pipeline:', error);
  }
})();

// Hugging Face summarization endpoint
app.post('/api/huggingface/summarize', async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'No data provided for summarization.' });
  }

  try {
    // Generate summary using Hugging Face
    const summary = await summarizer(data, {
      max_length: 1300, // Adjust based on desired summary length
      min_length: 30,
      do_sample: false,
    });

    // Return the generated summary
    res.json({ summary: summary[0].summary_text });
  } catch (error) {
    console.error('Hugging Face Summarization Error:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});