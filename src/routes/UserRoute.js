const router = require("express").Router();
const UserController = require("../controllers/UserController");
const widthAsyncErrorHandler = require("../middlaware/ErrorHandler");

router.post("/register", widthAsyncErrorHandler(UserController.register));
router.get("/login", widthAsyncErrorHandler(UserController.login));

module.exports = router;
