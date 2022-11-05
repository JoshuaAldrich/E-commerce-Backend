const router = require("express").Router();
const { response } = require("express");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    let dbCategoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    res.json(dbCategoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  });
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    let dbCategoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(dbCategoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    let dbCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(dbCategoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    let dbCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(dbCategoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
