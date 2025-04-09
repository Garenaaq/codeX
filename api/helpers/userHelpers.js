const User = require("../models/userModel");

const findUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Пользователь не найден");
  }
  return user;
};

const findProjectInPortfolio = (user, projectId) => {
  const projectIndex = user.portfolio.findIndex(
    (project) => project._id.toString() === projectId
  );
  if (projectIndex === -1) {
    throw new Error("Проект не найден");
  }
  return projectIndex;
};

module.exports = {
  findUserById,
  findProjectInPortfolio,
};
