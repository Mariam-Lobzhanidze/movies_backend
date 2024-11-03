const sequelize = require("./config/sequelize");
const User = require("./models/userModel");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
