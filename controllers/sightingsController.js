const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, comment) {
    super(model);
    this.commentModel = comment;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //delete a specific sighting
  async delete(req, res) {
    console.log(req.params);
    try {
      const sightingtoDelete = await this.model.destroy({
        where: {
          id: req.params.sightingId,
        },
      });
      return res
        .status(200)
        .json({ sighting: sightingtoDelete, message: "success" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //edit a specific sighting

  async edit(req, res) {
    console.log(req.params);
    try {
      const sightingtoEdit = await this.model.update(
        {
          date: req.body.date,
          notes: req.body.notes,
          location: req.body.location,
        },
        {
          where: {
            id: req.params.sightingId,
          },
        }
      );
      return res
        .status(200)
        .json({ sighting: sightingtoEdit, message: "success" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //get all comments for a sighting
  async getComments(req, res) {
    try {
      const { sightingId } = req.params;
      const allComments = await this.commentModel.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.status(200).json({ allComments, message: "success" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async createComment(req, res) {
    try {
      const { sightingId } = req.params;
      const { content } = req.body;
      const comment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      });
      return res.status(200).json(comment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = SightingsController;
