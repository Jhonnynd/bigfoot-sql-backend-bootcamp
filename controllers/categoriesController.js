const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  //get a single category
  async findAll(req, res) {
    try {
      const sendBack = await this.model.findAll();
      return res.json(sendBack);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //add a category
  async insertOne(req, res) {
    try {
      const data = req.body.name;
      await this.model.create({ name: data });
      const sendBack = await this.model.findAll();
      return res.json(sendBack);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
