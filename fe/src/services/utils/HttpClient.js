import { delay } from '../../utils/delay';
import { APIError } from '../../errors/ApiError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    await delay(1000);

    const response = await fetch(`${this.baseUrl}${path}`);

    let body = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('application/json')) {
      body = response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }
}

export default HttpClient;
