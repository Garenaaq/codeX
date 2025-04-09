const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, surname, nickname, email, password, role } = req.body;

    // Проверка на существование пользователя по email
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким email уже существует" });
    }

    // Проверка на существование пользователя по nickname
    const existingNicknameUser = await User.findOne({ nickname });
    if (existingNicknameUser) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким nickname уже существует" });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = new User({
      name,
      surname,
      nickname,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.login = async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const user = await User.findOne({ nickname });

    if (!user) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nickname: user.nickname,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nickname: user.nickname,
        role: user.role,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.cookie("accessToken", accessToken, { httpOnly: true });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nickname: user.nickname,
        role: user.role,
      },
      message: "Вход выполнен успешно",
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.status(200).json({ message: "Вы вышли из системы" });
  } catch {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Нет refresh токена" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ error: "Недействительный refresh токен" });
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          surname: user.surname,
          nickname: user.nickname,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );

      const refreshToken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          surname: user.surname,
          nickname: user.nickname,
          role: user.role,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          surname: user.surname,
          nickname: user.nickname,
          role: user.role,
        },
        message: "Вход выполнен успешно",
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.checkSession = async (req, res) => {
  res.sendStatus(200);
};
