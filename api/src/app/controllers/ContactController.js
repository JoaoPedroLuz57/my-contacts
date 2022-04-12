const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    return response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contatc = await ContactsRepository.findById(id);

    if (!contatc) {
      return response.status(404).send({ error: 'Contact not found' });
    }

    return response.json(contatc);
  }

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(404).json({ error: 'Name is required' });
    }

    const emailExists = await ContactsRepository.findByEmail(email);

    if (emailExists) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    return response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;

    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact does not exist' });
    }

    if (!name) {
      return response.status(404).json({ error: 'Name is required' });
    }

    const emailExists = await ContactsRepository.findByEmail(email);

    if (emailExists && emailExists.id !== id) {
      return response
        .status(404)
        .json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    return response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    const contatc = await ContactsRepository.findById(id);

    if (!contatc) {
      return response.status(404).send({ error: 'Contact not found' });
    }

    await ContactsRepository.delete(request.params.id);

    return response.sendStatus(204);
  }
}

module.exports = new ContactController();
