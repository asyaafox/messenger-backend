import { getPasswordHash } from "../core/security.js";
import User from "../models/model.user.js";

export const login = async (req, res) => {
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
};
