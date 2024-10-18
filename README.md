# AI Text-to-Speech Web App

This is a simple AI-powered text-to-speech (TTS) web application built using Node.js, Express, and an AI-based speech synthesis library. This project provides a web interface for users to input text, choose a voice, and generate speech audio that can be played and downloaded.

## Features
- Text-to-speech conversion using a custom voice model.
- Simple web interface to enter text, choose a voice, and generate an audio file.
- Audio file can be played directly on the webpage or downloaded.
- User-friendly interface to enter the OpenAI API key at runtime.

## Getting Started

### Prerequisites
- Node.js (v14 or newer recommended)
- npm (comes with Node.js)

### Installation

1. Clone the Repository
   ```sh
   git clone https://github.com/nawzaysfinah/tts-web-app.git
   cd tts-webapp
   ```

2. Install Dependencies
   ```sh
   npm install
   ```

3. Set Up Environment Variables
   Create a `.env` file in the root directory if needed, but note that the API key can now be entered directly via the web interface.

   Example `.env` file:
   ```
   # Optional: Default API key (can be overridden via the web interface)
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Run the Application

```sh
node index.js
```

The server will start running on [http://localhost:3000](http://localhost:3000).

## Usage
1. Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.
2. Enter your OpenAI API key in the provided input field.
3. Enter the text you want to convert to speech.
4. Select a voice and format, then click "Convert to Speech".
5. Once the audio is generated, you can play or download the audio file.

## File Structure
- `index.js`: Main server file, handles routes and API calls.
- `views/`: EJS templates for the web pages (index and result).
- `public/`: Static files (CSS, audio files, etc.).

## Credits
This project was inspired by the article "How to Build Your Own AI Text-to-Speech App in Minutes Using Node.js" by Ebinor Pak.

## License
This project is open-source and available under the MIT License.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request if you have suggestions or improvements.

## Contact
For any questions, feel free to contact the repository owner through GitHub.

