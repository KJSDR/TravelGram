import axios from 'axios';

// Create a configurable Mistral AI API service
const MISTRAL_API_ENDPOINT = 'https://api.mistral.ai/v1';

class MistralService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: MISTRAL_API_ENDPOINT,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
  }

  // List available models
  async listModels() {
    try {
      const response = await this.client.get('/models');
      return response.data;
    } catch (error) {
      console.error('Error listing models:', error);
      throw error;
    }
  }

  // Chat completion - non-streaming version
  async chat(messages, model = 'mistral-small-latest', options = {}) {
    try {
      const payload = {
        model,
        messages,
        ...options
      };
      
      const response = await this.client.post('/chat/completions', payload);
      return response.data;
    } catch (error) {
      console.error('Error in chat completion:', error);
      throw error;
    }
  }
  
  // Generate embeddings for text
  async embeddings(input, model = 'mistral-embed') {
    try {
      const payload = {
        model,
        input: Array.isArray(input) ? input : [input]
      };
      
      const response = await this.client.post('/embeddings', payload);
      return response.data;
    } catch (error) {
      console.error('Error generating embeddings:', error);
      throw error;
    }
  }
}

export default MistralService;