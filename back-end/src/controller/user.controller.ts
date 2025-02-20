import { Router } from "express";
import { SM } from "..";

const router = Router({ mergeParams: true });

// router to get all users
router.get("/", async (req, res) => {
  try {
    const users = await SM.userRepository.find();

    if (users && users.length > 0) {
      return res.status(200).send(users);
    } else {
      //throw not found error if there are no users
      return res.status(404).send("No users found");
    }
  } catch (error) {
    //throw internal server error if there is an error
    console.error("Error fetching users:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// router to get a user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await SM.userRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    if (user) {
      return res.status(200).send(user);
    } else {
      //throw not found error if there is no user with the given id
      return res.status(404).send("user not found");
    }
  } catch (error) {
    //throw internal server error if there is an error
    console.error("Error fetching user by ID:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// router to create a new user
router.post("/", async (req, res) => {
  try {
    const existinguser = await SM.userRepository.findOne({
      where: { user_name: req.body.name },
    });

    if (existinguser) {
      return res.status(400).send("user with the same name already exists");
    }
    const newuser = await SM.userRepository.save({
      user_name: req.body.name,
    });

    return res.status(201).send(newuser);
  } catch (error) {
    // throw internal server error if there is an error
    console.error("Error creating user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

//router to update a user
router.put("/put/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);

    // Update the user in the database
    const updateResult = await SM.userRepository.update(
      { id: userId },
      {
        user_name: req.body.name,
      }
    );

    // Check if the update was successful
    if (updateResult.affected === 1) {
      // Fetch the updated user
      const updateduser = await SM.userRepository.findOne({
        where: { id: userId },
      });
      // Return the updated user
      res.status(200).send(updateduser);
    } else {
      throw new Error("user not found or not updated");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//router to delete a user
router.delete("/delete/:id", (req, res) => {
  //call the database and delete the user with the given id
  SM.userRepository.delete({ id: Number(req.params.id) }).then((user) => {
    res.status(204).send(user);
  });
});

export const UserController = router;
