import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./services/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// --- 1. ГОЛОВНИЙ ЛОГЕР ---
// Цей код покаже в консолі КОЖЕН запит, який приходить на сервер.
// Якщо в логах Render ви це бачите — значить сервер працює і доступний.
app.use((req, res, next) => {
  console.log(`➡️ [ЗАПИТ ОТРИМАНО] ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors()); // Дозволяємо запити з будь-якого джерела
app.use(express.json());

// Маршрути
app.use("/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// --- 2. ЛОВЕЦЬ ПОМИЛОК ---
// Якщо сервер "впаде" під час обробки запиту, цей код виведе причину.
app.use((err, req, res, next) => {
  console.error("🔥 [КРИТИЧНА ПОМИЛКА СЕРВЕРА]:", err.stack);
  res.status(500).json({ 
    message: "Server error", 
    error: err.message 
  });
});

const PORT = process.env.PORT || 5000;

// --- 3. ЗАПУСК ---
const startServer = async () => {
  try {
    console.log("⏳ Підключення до бази даних...");
    // Переконайтеся, що connectDB повертає Promise (є async функцією)
    await connectDB(process.env.MONGO_URI);
    console.log("✅ База даних підключена успішно");

    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущено на порту ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Не вдалося запустити сервер. Помилка БД:");
    console.error(error);
    process.exit(1); // Завершити процес з помилкою
  }
};

startServer();