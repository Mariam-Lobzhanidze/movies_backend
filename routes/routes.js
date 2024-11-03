const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  blockUser,
  unblockUser,
  deleteUser,
  getAllUsers,
  changeUserRole,
} = require("../controllers/userController");
const { getTrailerById, getPopularMoviesByPageNumber } = require("../controllers/moviesController");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/users", authMiddleware, getAllUsers);
router.put("/users/block/:id", authMiddleware, blockUser);
router.put("/users/unblock/:id", authMiddleware, unblockUser);
router.delete("/users/:id", authMiddleware, deleteUser);
router.put("/users/role/:id", authMiddleware, changeUserRole);

router.get("/movies/:id/trailer", getTrailerById);
router.get("/popular", getPopularMoviesByPageNumber);

module.exports = router;
