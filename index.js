import express from "express";
import path from "path";
import aiSpeech, { ALLOWED_VOICES, ALLOWED_FORMATS } from "ai-text-to-speech";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Render the form
app.get("/", (req, res) => {
  res.render("index", {
    voices: ALLOWED_VOICES,
    formats: ALLOWED_FORMATS,
  });
});

// Handle form submission
app.post("/synthesize", async (req, res) => {
  const { text, voice, format } = req.body;
  try {
    const audioFilePath = await aiSpeech({
      input: text,
      voice: voice,
      response_format: format,
      dest_dir: "./public/audio",
      file_name: "tts-output",
      suffix_type: "nano",
      api_key: process.env.OPENAI_API_KEY, // Accessing the API key from the environment variable
    });
    const audioFileName = path.basename(audioFilePath);
    res.render("result", { audioFileName });
  } catch (error) {
    res.status(500).send(`Error generating speech audio: ${error.message}`);
  }
});

// // running on localhost
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// running on railway server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
