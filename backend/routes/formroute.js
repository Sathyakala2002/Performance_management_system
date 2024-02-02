const router = require("express").Router();

const {employeeFormSubmit,getUser,loggedIn, loginUser} = require('../controllers/formcontroller');
const { requireAuth } = require("../middleware/requireAuth");


router.post('/employee', employeeFormSubmit);
router.get('/getemplyee', getUser);
router.get('/loggedin',requireAuth, loggedIn);
router.post('/loginuser', loginUser);

module.exports = router;


