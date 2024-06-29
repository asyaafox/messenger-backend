import { Router } from "express";
import User from "../models/model.user.js";
import { getPasswordHash, generateToken } from "../core/security.js";
import bcrypt from "bcrypt";
import authenticateToken from "../middlewares/auth.js";
const router = Router();

router.post("/signup", async (req, res) => {
  // #swagger.tags = ['User']
  /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: { $ref: "#/definitions/AddUser" }
    } */
  try {
    const { username, password, fullName } = req.body;
    if (!username) {
      console.error("Error while trying to create user with null username");
      return res.status(400).json({ error: "Username can not be null" });
    }
    const oldUser = await User.findOne({ where: { username: username } });
    if (oldUser != null) {
      console.error(
        "Error while trying to create user with already existing username"
      );
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPasswordd = await getPasswordHash(password);
    console.log(hashedPasswordd);
    const user = await User.create({
      username: username,
      hashedPassword: hashedPasswordd,
      fullName: fullName,
    });
    console.log(`User with id ${user.dataValues.id} created`);
    return res.status(201).json({
      id: user.dataValues.id,
      username: user.dataValues.username,
      fullName: fullName,
    });
  } catch (error) {
    console.error("Error in signup controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/login", async (req, res) => {
  // #swagger.tags = ['User']
  /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: { $ref: "#/definitions/Login" }
    } */
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      console.error("Trying to login as non-existing user");
      return res.status(400).json({ error: "User not found" });
    }
    const isValid = await bcrypt.compare(
      password,
      user.dataValues.hashedPassword
    );
    if (isValid) {
      return res.status(200).json({ token: generateToken(user.dataValues.id) });
    } else {
      console.log("Passwords do not match! Authentication failed.");
      return res.status(400).json({ error: "Incorrect username or password" });
    }
  } catch (error) {
    console.error("Error in login controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/me", authenticateToken, async (req, res) => {
  // #swagger.security = [{"BearerAuth": []}]

  return res.send("mememe");
});

export default router;
