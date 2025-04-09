const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  return jwt.sign(
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
};

const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

// // Это для маршрутов, где пользователь может быть как авторизован, так и не авторизован.
const checkValiditySessionOptional = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  try {
    if (accessToken) {
      const user = await verifyAccessToken(accessToken);
      req.user = user;
    } else if (refreshToken) {
      const user = await verifyRefreshToken(refreshToken);
      const newAccessToken = createAccessToken(user);
      res.cookie("accessToken", newAccessToken, { httpOnly: true });
      req.user = user;
    }
    return next();
  } catch (error) {
    return next();
  }
};

module.exports = checkValiditySessionOptional;
