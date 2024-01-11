const router = require("express").Router();

const {employeeFormSubmit} = require('../controllers/formcontroller');


router.post('/employee', employeeFormSubmit);

module.exports = router;


