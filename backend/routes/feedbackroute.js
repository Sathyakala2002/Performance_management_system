const router = require("express").Router();

const {employeeFeedbackSubmit,getFeedback} = require('../controllers/feedbackcontroller');


router.post('/feedback', employeeFeedbackSubmit);
router.get('/getfeedback', getFeedback);


module.exports = router;