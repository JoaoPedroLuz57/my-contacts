import { delay } from '../utils/delay';

class ContactsService {
  async listContacts(orderBy = 'asc') {
    await delay(1500);

    const response = await fetch(
      `http://localhost:3001/contacts?orderBy=${orderBy}`,
    );

    return response.json();
  }
}

export default new ContactsService();
