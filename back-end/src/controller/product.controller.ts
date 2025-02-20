import { Router } from "express";
import { SM } from "..";

const router = Router({ mergeParams: true });

// router to get all products
router.get("/", async (req, res) => {
  try {
    const products = await SM.productRepository.find();

    if (products && products.length > 0) {
      return res.status(200).send(products);
    } else {
      //throw not found error if there are no products
      return res.status(404).send("No products found");
    }
  } catch (error) {
    //throw internal server error if there is an error
    console.error("Error fetching products:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// router to get a product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await SM.productRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    if (product) {
      return res.status(200).send(product);
    } else {
      //throw not found error if there is no product with the given id
      return res.status(404).send("product not found");
    }
  } catch (error) {
    //throw internal server error if there is an error
    console.error("Error fetching product by ID:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// router to create a new product
router.post("/", async (req, res) => {
  try {
    const newproduct = await SM.productRepository.save({
      product_name: req.body.product_name,
      product_unit: req.body.product_unit,
      product_link: req.body.product_link,
      product_description: req.body.product_description,
      product_price: req.body.product_price,
      product_image: req.body.product_image,
    });

    return res.status(201).send(newproduct);
  } catch (error) {
    // throw internal server error if there is an error
    console.error("Error creating product:", error);
    return res.status(500).send("Internal Server Error");
  }
});

//router to update a product
router.put("/put/:id", async (req, res) => {
  try {
    const productId = Number(req.params.id);

    // Update the product in the database
    const updateResult = await SM.productRepository.update(
      { id: productId },
      {
        product_name: req.body.name,
      }
    );

    // Check if the update was successful
    if (updateResult.affected === 1) {
      // Fetch the updated product
      const updatedproduct = await SM.productRepository.findOne({
        where: { id: productId },
      });
      // Return the updated product
      res.status(200).send(updatedproduct);
    } else {
      throw new Error("product not found or not updated");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//router to delete a product
router.delete("/delete/:id", (req, res) => {
  //call the database and delete the product with the given id
  SM.productRepository.delete({ id: Number(req.params.id) }).then((product) => {
    res.status(204).send(product);
  });
});

export const ProductController = router;
