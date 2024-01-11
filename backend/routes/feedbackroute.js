const router = require("express").Router();

const {employeeFeedbackSubmit} = require('../controllers/feedbackcontroller');


router.post('/feedback', employeeFeedbackSubmit);

module.exports = router;