const User = require("../models/userModel");

const createUser = async (username, email, password) => {
  try {
    const user = await User.create({
      username,
      email,
      password,
      status: "active",
      role: "user",
    });
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserStatus = async (id, status) => {
  try {
    await User.update({ status }, { where: { id } });
  } catch (error) {
    throw error;
  }
};

const updateUserRole = async (id, role) => {
  try {
    await User.update({ role }, { where: { id } });
  } catch (error) {
    throw error;
  }
};

const getUserRole = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user?.role;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    await User.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      offset,
      limit,
    });

    const totalUsers = await User.count();

    return { users, totalUsers };
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserStatus,
  deleteUser,
  getAllUsers,
  updateUserRole,
  getUserRole,
};
