const axios = require('axios');

const getOllamaResponse = async (prompt) => {
  try {
    const response = await axios.post('http://127.0.0.1:11434/api/generate', {
      model: 'llama2:7b',
      prompt: prompt,
      stream: false,
    });

    return response.data.response;
  } catch (error) {
    console.error('Ollama API Error:', error.message);
    throw error;
  }
};

module.exports = { getOllamaResponse };
