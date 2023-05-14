// Express
const express = require('express');
const app = express();
require('dotenv').config();

// OpenAI
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
 apiKey: process.env.API_KEY
});
const openai = new OpenAIApi(configuration);

const path = require('path');

const port = 8080;

// Define route for generating text
app.get('/generate-text', async (req, res) => {
 // Get prompt from query string
 const prompt = req.query.prompt || 'Hello, what is your name?';

 // Set up GPT-3.5 parameters
 const completion = await openai.createChatCompletion({
   model: "gpt-3.5-turbo",
   temperature: 1,
   max_tokens: 2048,
   messages: [{role: "user", content: prompt}]
 })
 console.log(completion);
 const text = completion.data.choices[0].message.content.trim();
 res.send(text);
});

// Serve HTML file
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});