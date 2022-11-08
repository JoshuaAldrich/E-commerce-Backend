const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    let dbProductData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
        },
      ],
    });
    res.json(dbProductData);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// get one product
router.get("/:id", async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    let dbProductData = await Product.findOne({
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
        },
      ],
    });
    res.json(dbProductData);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// create new product
router.post("/", async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    let dbProductData = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      tagIds: req.body.tag_id,
    });
    res.json(dbProductData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update product
router.put("/:id", async (req, res) => {
  // update product data
  try {
    let dbProductData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(dbProductData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    let dbProductData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(dbProductData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
