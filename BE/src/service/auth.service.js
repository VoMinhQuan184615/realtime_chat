import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { MESSAGES } from "../constants/messages.js";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

class AuthService {
  async login({ identifier, password }) {
    // identifier can be email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) throw new Error(MESSAGES.ERROR.USER_NOT_FOUND);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error(MESSAGES.ERROR.INVALID_CREDENTIALS);

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatarImage: user.avatarImage,
      },
    };
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
}

export default new AuthService();
