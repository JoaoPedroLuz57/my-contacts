export class APIError extends Error {
  constructor(response, body) {
    super();

    this.name = 'APIError';
    this.response = response;
    this.body = body;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }

  getContentType() {
    return this.response.headers.get('Content-Type');
  }
}
