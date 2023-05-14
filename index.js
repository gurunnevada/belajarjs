// Express
const express = require('express');
const app = express();
require('dotenv').config();

// OpenAI
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
 apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

const path = require('path');

// Define route for generating text
app.get('/generate-text', async (req, res) => {
 // Get prompt from query string
 const prompt = 'Who are you?' || req.query.prompt;

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

// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});