const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const OpenAI = require('openai');

dotenv.config();

const OPENAI_API_KEY = "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";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// OpenAI Summarization Route
app.post('/summarize', async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'No data provided for summarization.' });
  }

  try {
    // Generate summary using OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Choose the model
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that summarizes company sustainability data. 
                    Always divide the summary into two sections: 
                    1. Environmental Sustainability 
                    2. Social Sustainability.`,
        },
        {
          role: 'user',
          content: `Summarize the following company sustainability data into two sections: 
                    1. Environmental Sustainability 
                    2. Social Sustainability. 
                    Here is the data:\n\n${data}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const summary = response.choices?.[0]?.message?.content?.trim() || "Summary could not be generated.";
    
    res.json({ summary });
  } catch (error) {
    console.error('OpenAI Summarization Error:', error.response?.data || error.message);
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
