# ai-text-to-speech

***Simplify your AI text-to-speech integration!***

A powerful and straightforward Node.js module for generating speech audio from text using the OpenAI API (support for other TTS providers in the works). **ai-text-to-speech** offers a simple and robust interface to convert text into high-quality speech audio files in various formats and voices.

Developed by Jerry Kapron for everyone to use freely 👍🏼  
**[☕️ Buy me a coffee](https://buymeacoffee.com/jkapron)**

## Table of Contents

- [ai-text-to-speech](#ai-text-to-speech)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [How to load the module in your code](#how-to-load-the-module-in-your-code)
    - [Basic Example with async/await](#basic-example-with-asyncawait)
    - [Basic Example with Promise .then()/.catch()](#basic-example-with-promise-thencatch)
    - [Advanced Usage with async/await](#advanced-usage-with-asyncawait)
    - [Advanced Usage with Promise .then()/.catch()](#advanced-usage-with-promise-thencatch)
  - [Options](#options)
    - [`input` (string, required)](#input-string-required)
    - [`dest_dir` (string, optional)](#dest_dir-string-optional)
    - [`file_name` (string, optional)](#file_name-string-optional)
    - [`voice` (string, optional)](#voice-string-optional)
    - [`model` (string, optional)](#model-string-optional)
    - [`response_format` (string, optional)](#response_format-string-optional)
    - [`suffix_type` (string, optional)](#suffix_type-string-optional)
    - [`api_key` (string, optional)](#api_key-string-optional)
  - [Allowed Values](#allowed-values)
    - [Voices](#voices)
    - [Models](#models)
    - [Response Formats](#response-formats)
    - [Suffix Types](#suffix-types)
  - [Edge Cases and Warnings](#edge-cases-and-warnings)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)
    - [Audio Format Descriptions:](#audio-format-descriptions)
    - [☕️ Buy me a coffee](#️-buy-me-a-coffee)

## Features

- **Easy Integration**: Seamlessly integrate text-to-speech functionality into your Node.js applications.
- **Multiple Voices**: Choose from a variety of high-quality voices to suit your application's needs.
- **Flexible Output Formats**: Supports various audio formats like MP3, WAV, FLAC, and more.
- **Customizable File Naming**: Control the output file naming with suffix options to prevent overwrites.
- **Robust Error Handling**: Comprehensive validation and descriptive error messages for easy debugging.

## Installation

Install **ai-text-to-speech** via NPM:

```bash
npm install ai-text-to-speech
```

## Usage


### How to load the module in your code

```javascript
// Use this import statement if your project supports ES Modules
import aiSpeech from 'ai-text-to-speech';
```  

OR  

```javascript
// Use this require statement if your project uses CommonJS modules
const aiSpeech = require('ai-text-to-speech');
```



### Basic Example with async/await

```javascript
(async () => { // or nested inside another async function

  try {
    const audioFilePath = await aiSpeech({
      input: 'Buy me a coffee if it works for you.'
      // If the OPENAI_API_KEY environment variable is already set,
      // you don't have to specify the api_key option
    });
    console.log(`Audio file saved at: ${audioFilePath}`);
  } catch (error) {
    console.error('Error generating speech audio:', error.message);
  }

})();
```  


### Basic Example with Promise .then()/.catch()

```javascript
// This approach can be useful if you prefer working with promises directly
// or if you're in an environment where async/await is not supported.

aiSpeech({
  input: 'Buy me a coffee if it works for you.',
  // You can explicitly provide your OpenAI API key here
  api_key: 'YOUR_OPENAI_API_KEY', // if process.env.OPENAI_API_KEY is not set
})
.then((audioFilePath) => {
    console.log(`Audio file saved at: ${audioFilePath}`);
})
.catch((error) => {
    console.error('Error generating speech audio:', error.message);
});
```


### Advanced Usage with async/await

```javascript
(async () => { // or nested inside another async function

  try {
    const audioFilePath = await aiSpeech({
      input: 'Buy me a coffee if it works for you.',
      dest_dir: './audio',
      file_name: 'welcome-message',
      voice: 'echo',
      model: 'tts-1-hd',
      response_format: 'wav',
      suffix_type: 'nano',
      api_key: 'YOUR_OPENAI_API_KEY', // if process.env.OPENAI_API_KEY is not set
    });
    console.log(`Audio file saved at: ${audioFilePath}`);
  } catch (error) {
    console.error('Error generating speech audio:', error.message);
  }

})();
```

### Advanced Usage with Promise .then()/.catch()

```javascript
// This approach can be useful if you prefer working with promises directly
// or if you're in an environment where async/await is not supported.

aiSpeech({
    input: 'Buy me a coffee if it works for you.',
    dest_dir: './audio',
    file_name: 'welcome-message',
    voice: 'echo',
    model: 'tts-1-hd',
    response_format: 'wav',
    suffix_type: 'nano',
    api_key: 'YOUR_OPENAI_API_KEY', // if process.env.OPENAI_API_KEY is not set
})
.then((audioFilePath) => {
    console.log(`Audio file saved at: ${audioFilePath}`);
})
.catch((error) => {
    console.error('Error generating speech audio:', error.message);
});
```


## Options

### `input` (string, required)
The text to generate audio for. **Maximum length is 4096 characters**.
  

### `dest_dir` (string, optional)
The destination directory to save the audio file. **Default**: `'./'` (current directory).
  
  
### `file_name` (string, optional)
The base name of the output file. **Default**: `'speech-audio'`.
  
  
### `voice` (string, optional)
The voice to use for speech synthesis. **Default**: `'nova'`.
  
  
### `model` (string, optional)
The TTS model to use. **Default**: `'tts-1'`.
  
  
### `response_format` (string, optional)
The audio format for the output file. **Default**: `'mp3'`.
  
  
### `suffix_type` (string, optional)
The type of unique suffix used in the file name. **Default**: `'uuid'`.
  
  
### `api_key` (string, optional)
Your OpenAI API key. **Default**: The value of the `OPENAI_API_KEY` environment variable.
  
  
## Allowed Values

### Voices

- `alloy`
- `echo`
- `fable`
- `onyx`
- `nova` (default)
- `shimmer`

### Models

- `tts-1` (default)
- `tts-1-hd`

### Response Formats

- `mp3` (default)
- `opus`
- `aac`
- `flac`
- `wav`
- `pcm`

### Suffix Types

- `uuid` (default): A unique UUID string.
- `milli`: Timestamp in milliseconds.
- `micro`: Timestamp in microseconds.
- `nano`: Timestamp in nanoseconds.
- `none`: No suffix. **Warning**: May overwrite existing files if filenames collide.

## Edge Cases and Warnings

- **Input Length**: The `input` text must not exceed **4096 characters**. Exceeding this limit will result in an error.
- **File Overwrite Risk**: Using `suffix_type: 'none'` without specifying a unique `file_name` may lead to overwriting existing files.
- **Directory Permissions**: Ensure the `dest_dir` exists and the application has write permissions. The module will throw an error if it cannot write to the directory.
- **API Key Requirement**: An OpenAI API key is required. Set it via the `api_key` option or the `OPENAI_API_KEY` environment variable.
- **Network Errors**: Network issues or incorrect API endpoints will result in errors. Ensure you have a stable internet connection.
- **Unsupported Values**: Providing unsupported values for `voice`, `model`, `response_format`, or `suffix_type` will result in an error.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [OpenAI](https://openai.com/) for providing the API used in this module.
- [Node.js](https://nodejs.org/) community for their continuous support.

---

For more information on voice options, see the [OpenAI Text-to-Speech Voice Options](https://platform.openai.com/docs/guides/text-to-speech/voice-options).

### Audio Format Descriptions:

- **Opus**: Ideal for internet streaming and communication due to low latency.
- **AAC**: Preferred for digital audio compression; widely used on YouTube, Android, and iOS.
- **FLAC**: Suitable for lossless audio compression; favored by audio enthusiasts for archiving.
- **WAV**: Uncompressed audio, suitable for applications requiring minimal decoding overhead.
- **PCM**: Raw audio samples in 24kHz (16-bit signed, little-endian), without headers.

---

*Note*: Ensure compliance with OpenAI's usage policies when integrating this module into your applications.

---
### [☕️ Buy me a coffee](https://buymeacoffee.com/jkapron)  

<a href="https://buymeacoffee.com/jkapron" title="Buy Me A Coffee">
<img src="https://virofend.com/jk_bmc_qr_2.png" />
</a>

---
[Back to top](#ai-text-to-speech)