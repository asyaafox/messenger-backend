import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
export const getPasswordHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.error("Error generating hash", err);
    throw err;
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result; // result is a boolean
  } catch (err) {
    console.error("Error comparing password", err);
    throw err;
  }
};

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
    expiresIn: "6h",
  });
  return token;
};
