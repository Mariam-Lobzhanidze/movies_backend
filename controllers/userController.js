const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const { users, totalUsers } = await userService.getAllUsers(page, limit);

    res.json({
      users,
      totalUsers,
      page,
      limit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const blockUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userService.updateUserStatus(id, "blocked");
    res.json({ message: "User blocked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unblockUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userService.updateUserStatus(id, "active");
    res.json({ message: "User unblocked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role provided." });
  }

  try {
    await userService.updateUserRole(id, role);
    res.json({ message: `User role updated to ${role}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
  changeUserRole,
};
