const router = require("express").Router();
const TaskController = require("../controllers/TaskController");
const widthAsyncErrorHandler = require("../middlaware/ErrorHandler");

router.post("/create", widthAsyncErrorHandler(TaskController.register));

module.exports = router;
