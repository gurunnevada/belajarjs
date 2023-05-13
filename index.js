// Express
const express = require('express');
const app = express();

// OpenAI
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
 apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const path = require('path');

// Define route for generating text
app.get('/generate-text', async (req, res) => {
 // Get prompt from query string
 const prompt = 'Create me a holiday itinerary for 3 days at ' + req.query.prompt;

 // Set up GPT-3 parameters
 const completion = await openai.createChatCompletion({
   model: "gpt-3.5-turbo",
   temperature: 1,
   max_tokens: 2048,
   messages: [{role: "user", content: prompt}]
 })
 const text = completion.data.choices[0].message.content.trim();
 res.send(text);
});

// Serve HTML file
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
   