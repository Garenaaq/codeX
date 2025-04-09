const User = require("../models/userModel");
const {
  findUserById,
  findProjectInPortfolio,
} = require("../helpers/userHelpers");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userProfile = await findUserById(userId);

    userProfile.portfolio = userProfile.portfolio.reverse();

    return res.status(200).json({ userProfile });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const values = req.body;

    if (values.nickname) {
      const existingUser = await User.findOne({
        nickname: values.nickname,
        _id: { $ne: userId },
      });
      if (existingUser) {
        return res.status(400).json({ error: "Этот никнейм уже занят" });
      }
    }

    const editProfile = await User.findByIdAndUpdate(userId, values, {
      new: true,
    });

    if (!editProfile) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json({
      message: "Ваш профиль успешно обновлён",
      editProfile,
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, links, previewImage } = req.body;

    const userId = req.user.id;

    const user = await findUserById(userId);

    const newProject = {
      title,
      description,
      links,
      previewImage,
    };

    user.portfolio.push(newProject);

    await user.save();

    return res.status(200).json({
      message: "Проект успешно добавлен",
      project: user.portfolio[user.portfolio.length - 1],
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.query.projectId;
    const userId = req.user.id;

    const user = await findUserById(userId);

    const projectIndex = user.portfolio.findIndex(
      (project) => project._id.toString() === projectId
    );

    if (projectIndex === -1) {
      return res.status(404).json({ message: "Проект не найден" });
    }

    user.portfolio.splice(projectIndex, 1);

    await user.save();

    return res
      .status(200)
      .json({ message: "Проект успешно удалён", deleteProjectId: projectId });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.editProject = async (req, res) => {
  try {
    const { title, description, links, previewImage, projectId } = req.body;

    const userId = req.user.id;

    const user = await findUserById(userId);

    const projectIndex = findProjectInPortfolio(user, projectId);

    user.portfolio[projectIndex].title =
      title || user.portfolio[projectIndex].title;
    user.portfolio[projectIndex].description =
      description || user.portfolio[projectIndex].description;
    user.portfolio[projectIndex].links =
      links || user.portfolio[projectIndex].links;
    user.portfolio[projectIndex].previewImage =
      previewImage || user.portfolio[projectIndex].previewImage;

    await user.save();

    return res.status(200).json({
      message: "Ваш проект был успешно обновлён",
      editProject: user.portfolio[projectIndex],
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.getProject = async (req, res) => {
  try {
    const { userId, projectId } = req.params;

    const user = await findUserById(userId);

    const project = user.portfolio.find(
      (project) => project._id.toString() === projectId
    );

    if (!project) {
      return res.status(404).json({ message: "Проект не найден" });
    }

    const dataProject = {
      project,
      author: user.nickname,
    };

    return res.status(200).json(dataProject);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
