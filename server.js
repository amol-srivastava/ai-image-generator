const express = require('express');
const cors = require('cors');
const OpenAI = require('openai'); // Adjust the import statement as per your environment

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

// Initialize OpenAI API client with API key directly
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Predefined list of surprise prompts
const surprisePrompts = [
  'A beautiful sunset over the ocean',
  'A futuristic cityscape',
  'A serene mountain landscape',
  'A magical forest',
  'A bustling market scene'
];

app.post('/images', async (req, res) => {
  try {
    let { prompt, isSurprise } = req.body;

    if (isSurprise) {
      // Select a random prompt if it's a surprise request
      prompt = surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)];
    }

    if (!prompt) {
      return res.status(400).send({ error: 'Prompt is required' });
    }

    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1, // Adjust number of images as required
      size: "1024x1024"
    });

    console.log('Generated Image URLs:', image.data); // Assuming image.data contains URLs or relevant data
    res.send(image.data); // Sends back the response to the client
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Failed to generate image' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
