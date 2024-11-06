const sequelize = require("./config/sequelize");
require("./associations");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
