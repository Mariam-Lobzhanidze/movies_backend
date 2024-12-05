const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const User = require("../models/userModel");
const Movie = require("../models/movieModel");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await userService.createUser(username, email, hashedPassword);

    res.status(201).json({ message: "User registered successfully!", userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email or password not found" });
    }

    if (user.status === "blocked") {
      return res.status(401).json({ message: "Account is blocked." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email or password not found" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const userWithDetails = await User.findByPk(user.id, {
      include: [
        {
          model: Movie,
          as: "favorites",
          through: { attributes: [] },
        },
        {
          model: Movie,
          as: "watchlist",
          through: { attributes: [] },
        },
      ],
    });

    const userData = {
      id: user.id,
      username: user.username,
      role: user.role,
      status: user.status,
      profile_image_url: user.profile_image_url,
      favorites: userWithDetails.favorites,
      watchlist: userWithDetails.watchlist,
    };

    res.json({ token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
};
