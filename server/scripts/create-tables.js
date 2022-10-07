const sequelize = require("../config/database");

sequelize.sync({ force: true }).then(() => {
  console.log("All models were synchronized successfully.");
});
