const router = require("express").Router();

const {employeeFormSubmit,getUser} = require('../controllers/formcontroller');


router.post('/employee', employeeFormSubmit);
router.get('/getemplyee', getUser);

module.exports = router;


