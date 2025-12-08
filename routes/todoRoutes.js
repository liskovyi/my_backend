import express from "express";
import { 
  getTodos, 
  createTodo, 
  updateTodo, 
  deleteTodo 
} from "../controllers/todoController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authRequired, getTodos);
router.post("/", authRequired, createTodo);
router.put("/:id", authRequired, updateTodo);
router.delete("/:id", authRequired, deleteTodo);

export default router;