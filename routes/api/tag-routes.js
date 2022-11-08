const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    let dbTagData = await Tag.findAll({
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    res.json(dbTagData);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    let dbTagData = await Tag.findOne({
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    res.json(dbTagData);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    let dbTagData = await Tag.create({
      tag_id: req.body.tag_id,
      tag_name: req.body.tag_name,
    });
    res.json(dbTagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    let dbTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(dbTagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    let dbTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(dbTagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
