const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes"); // Маршруты аутентификации
const postRoutes = require("./routes/postRoutes"); // Маршруты постов
const profileRoutes = require("./routes/profileRoutes"); // Маршруты профиля

const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к бд
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Успешное подключение к MongoDB"))
  .catch((error) => console.error("Ошибка подключения к MongoDB:", error));

// // Middleware
app.use(express.json({ limit: "10mb" })); // Для парсинга JSON-данных
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// Подключение маршрутов
app.use("/auth", authRoutes); // Все маршруты аутентификации будут начинаться с /api/auth
app.use("/post", postRoutes); // Все маршруты связанные с постами
app.use("/profile", profileRoutes); // Все маршруты связанные с профилем

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
