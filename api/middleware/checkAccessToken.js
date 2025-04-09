const jwt = require("jsonwebtoken");

const checkAccessToken = (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(403).json({ error: "Access Token отсутствует!" });
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Access Token истек или недействителен!" });
    }

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
};

module.exports = checkAccessToken;
