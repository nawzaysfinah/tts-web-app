import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

const allowedVoices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
const allowedModels = ['tts-1', 'tts-1-hd'];
const allowedFormats = ['mp3', 'opus', 'aac', 'flac', 'wav', 'pcm'];
const allowedSuffixTypes = ['uuid', 'milli', 'micro', 'nano', 'none'];

export const ALLOWED_VOICES = allowedVoices;
export const ALLOWED_MODELS = allowedModels;
export const ALLOWED_FORMATS = allowedFormats;
export const ALLOWED_SUFFIX_TYPES = allowedSuffixTypes;

const now = (unit) => {
  const hrTime = process.hrtime();

  switch (unit) {
    case 'milli':
      return hrTime[0] * 1000 + hrTime[1] / 1000000;

    case 'micro':
      return hrTime[0] * 1000000 + hrTime[1] / 1000;

    case 'nano':
    default:
      return hrTime[0] * 1000000000 + hrTime[1];
  }
};

/**
 * Generates speech audio from text using the OpenAI API.
 *
 * @param {Object} options - The options for generating speech audio.
 * @param {string} options.input - The text to generate audio for. The maximum length is 4096 characters.
 * @param {string} [options.dest_dir='./'] - The destination directory to save the audio file. Default value is './'.
 * @param {string} [options.file_name='speech-audio'] - The base name of the output file. Default value is 'speech-audio'. Used as the prefix of the name of the generated audio file.
 * @param {string} [options.voice='nova'] - The voice to use for speech synthesis. Supported voices are `alloy`, `echo`, `fable`, `onyx`, `nova`, and `shimmer`.
 * @param {string} [options.model='tts-1'] - The TTS model to use. Valid values are `tts-1` or `tts-1-hd`
 * @param {string} [options.response_format='mp3'] - The audio format for the output file. The default response format is 'mp3', but other formats like 'opus', 'aac', 'flac', and 'pcm' are available.
 * @param {string} [options.suffix_type='uuid'] - The type of the unique string used as the suffix for the file name of the generated audio file. The default value is 'uuid'. Supported values are `uuid`, `milli`, `micro`, `nano` and `none`. Be careful when using 'none', especially when not providing file_name, as it will always generate the same file name (speech-audio.mp3, speech-audio.wav, etc.) and may overwrite previously generated files.
* @param {string} [options.api_key=process.env.OPENAI_API_KEY] - The OpenAI API key. The default value will come from process.env.OPENAI_API_KEY
* @returns {Promise<string>} - The path to the saved audio file.
 * @throws Will throw an error if input validation fails or the API call is unsuccessful.
 */

export default async function aitts(options = {}) {
  const {
    input,
    dest_dir = './',
    file_name = 'speech-audio',
    voice = 'nova',
    model = 'tts-1',
    response_format = 'mp3',
    suffix_type = 'uuid',
    api_key = process.env.OPENAI_API_KEY,
  } = options;


  // Check if text input was provided
  if (!input) {
    throw new Error('No input text provided.');
  }

  // Input lenght validation
  if (input.length > 4096) {
    throw new Error(
      'Input text exceeds the maximum allowed length of 4096 characters.'
    );
  }

  // Voice option validation
  if (!allowedVoices.includes(voice)) {
    throw new Error(
      `Invalid voice '${voice}'. Allowed voices are: ${allowedVoices.join(
        ', '
      )}.`
    );
  }

  // Model option validation
  if (!allowedModels.includes(model)) {
    throw new Error(
      `Invalid model '${model}'. Allowed models are: ${allowedModels.join(
        ', '
      )}.`
    );
  }

  // Model option validation
  if (!allowedFormats.includes(response_format)) {
    throw new Error(
      `Invalid response format '${response_format}'. Allowed formats are: ${allowedFormats.join(
        ', '
      )}.`
    );
  }

  const dir_path = path.resolve(dest_dir);

  // Check if the destination directory exists and is a directory
  try {
    const stats = await fs.promises.stat(dir_path);
    if (!stats.isDirectory()) {
      throw new Error(`The path '${dir_path}' is not a directory.`);
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`Destination directory '${dir_path}' does not exist.`);
    } else {
      throw err;
    }
  }

  // Check if we have write permissions to the destination directory
  try {
    await fs.promises.access(dir_path, fs.constants.W_OK);
  } catch (err) {
    throw new Error(`No write permission to the directory '${dir_path}'.`);
  }
  

  if (!api_key) {
    throw new Error('The OpenAI API key could NOT be found. It either has to come from the OPENAI_API_KEY environment variable or be explicitly set as the value of the api_key option in the function call.');

  }

  if (!allowedSuffixTypes.includes(suffix_type)) {
    throw new Error(
      `Invalid suffix_type '${suffix_type}'. Allowed values for suffix_type are: ${allowedSuffixTypes.join(
        ', '
      )}.`
    );
  }

  let suffix;

  switch (suffix_type) {
    case 'milli':
    case 'micro':
    case 'nano':
      suffix = now(suffix_type)
      break
    case 'none':
      suffix = null
      break
    case 'uuid':
    default:
      suffix = uuidv4()
  }
  
  const openai = new OpenAI({
    apiKey: api_key,
  });

  const speechFile = path.resolve(
    dir_path,
    `${file_name || 'speech-audio'}${suffix ? '-' + suffix : ''}.${response_format}`
  );

  try {
    const audioResponse = await openai.audio.speech.create({
      model,
      voice,
      input,
      response_format,
    });

    const buffer = Buffer.from(await audioResponse.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

    return speechFile;

  } catch (err) {

    if (err?.response) {

      switch (err.response.status) {
        case 400:
          throw new Error('Bad request. Please check your input parameters.');
        case 401:
          throw new Error('Unauthorized. Check your API key.');
        case 429:
          throw new Error('API rate limit exceeded.');
        case 500:
          throw new Error('Internal server error at OpenAI.');
        default:
          throw new Error(`API error: ${err.response.status} ${err.response.statusText}`);
          
      }
      
    } else if (err.code === 'EACCES') {
      throw new Error(`Failed to write audio file: ${err.message}`);
    } else if (err.code === 'ENOTFOUND') {
      throw new Error('Network error: Unable to reach OpenAI API.');
    } else {
      throw new Error(`An unexpected error occurred: ${err.message}`);
    }


  }
}


/**
 * For more information on voice options, see:
 * https://platform.openai.com/docs/guides/text-to-speech/voice-options
 *
 * Opus: For internet streaming and communication, low latency.
 * AAC: For digital audio compression, preferred by YouTube, Android, iOS.
 * FLAC: For lossless audio compression, favored by audio enthusiasts for archiving.
 * WAV: Uncompressed WAV audio, suitable for low-latency applications to avoid decoding overhead.
 * PCM: Similar to WAV but containing the raw samples in 24kHz (16-bit signed, low-endian), without the header.
 */
