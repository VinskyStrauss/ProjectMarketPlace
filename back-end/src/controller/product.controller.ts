import { Router } from "express";
import { SM } from "..";

const router = Router({ mergeParams: true });

// router to get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await SM.categoryRepository.find();

    if (categories && categories.length > 0) {
      return res.status(200).send(categories);
    } else {
      //throw not found error if there are no categories
      return res.status(404).send("No categories found");
    }
  } catch (error) {
    //throw internal server error if there is an error
    console.error("Error fetching categories:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// router to get a category by id
router.get("/:id", async (req, res) => {
  try {
    const category = await SM.categoryRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    if (category) {
      return res.status(200).send(category);
    } else {
      //throw not found error if there is no category with the given id
      return res.status(404).send("Category not found");
    }
  } catch (error) {
    //throw internal server error if there is an error
    console.error("Error fetching category by ID:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// router to create a new category
router.post("/", async (req, res) => {
  try {
    const existingCategory = await SM.categoryRepository.findOne({
      where: { name: req.body.name },
    });

    if (existingCategory) {
      return res.status(400).send("Category with the same name already exists");
    }

    const newCategory = await SM.categoryRepository.save({
      name: req.body.name,
    });

    return res.status(201).send(newCategory);
  } catch (error) {
    // throw internal server error if there is an error
    console.error("Error creating category:", error);
    return res.status(500).send("Internal Server Error");
  }
});

//router to update a category
router.put("/put/:id", async (req, res) => {
  try {
    const categoryId = Number(req.params.id);

    // Update the category in the database
    const updateResult = await SM.categoryRepository.update(
      { id: categoryId },
      {
        name: req.body.name,
      }
    );

    // Check if the update was successful
    if (updateResult.affected === 1) {
      // Fetch the updated category
      const updatedCategory = await SM.categoryRepository.findOne({
        where: { id: categoryId },
      });
      // Return the updated category
      res.status(200).send(updatedCategory);
    } else {
      throw new Error("Category not found or not updated");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//router to delete a category
router.delete("/delete/:id", (req, res) => {
  //call the database and delete the category with the given id
  SM.categoryRepository
    .delete({ id: Number(req.params.id) })
    .then((category) => {
      res.status(204).send(category);
    });
});

export const CategoryController = router;
