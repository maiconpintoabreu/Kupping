const router = require("express").Router();
const userController = require('./controllers/user.controller');

router.get("public/login",userController.login);
router.get("public/signin",userController.insertUser);



module.exports = router;