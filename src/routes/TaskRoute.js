const router = require("express").Router();
const TaskController = require("../controllers/TaskController");
const widthAsyncErrorHandler = require("../middlaware/ErrorHandler");

const verifyToken = require("../utils/verify-token");

router.post("/create", widthAsyncErrorHandler(TaskController.register));
router.get(
  "/",
  verifyToken,
  widthAsyncErrorHandler(TaskController.getAllUserTasks)
);
router.put(
  "/:id",
  verifyToken,
  widthAsyncErrorHandler(TaskController.updateTask)
);

router.delete(
  "/:id",
  verifyToken,
  widthAsyncErrorHandler(TaskController.removeTaskById)
);

module.exports = router;
