const CategoryRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query;
    const categories = await CategoryRepository.findAll(orderBy);

    return res.json(categories);
  }

  async show(req, res) {
    const { id } = req.params;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return res.status(404).send({ error: 'Category not found' });
    }

    return res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(404).send({ error: 'Name is required' });
    }

    const nameExists = await CategoryRepository.findByName(name);

    if (nameExists) {
      return res.status(400).send({ error: 'Name already exists' });
    }

    const category = await CategoryRepository.create(name);

    return res.status(201).json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const idExists = await CategoryRepository.findById(id);

    if (!idExists) {
      return res
        .status(404)
        .send({ error: `Not found any category with id: ${id}` });
    }

    if (!name) {
      return res.status(404).send({ error: 'Name is required' });
    }

    const category = await CategoryRepository.update(id, { name });

    return res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    const idExists = await CategoryRepository.findById(id);

    if (!idExists) {
      return res
        .status(404)
        .send({ error: `Not found category with id ${id}` });
    }

    await CategoryRepository.delete(id);

    return res.sendStatus(204);
  }
}

module.exports = new CategoryController();
