const express = require('express')
const feedbackController = require('../controllers/feedback.controller')
const subjectController = require('../controllers/subject.controller')

const router = express.Router()

router.route('/')
	.get(
		subjectController.getSubjects
	)
	.post(
		subjectController.addSubject
	)

router.route('/:id/faculty')
	.post(
		subjectController.addFacultytoSubject
	)

router.route('/:subjectId/faculty/:facultyId')
	.get(
		feedbackController.getFeedback
	)
	.post(
		feedbackController.createFeedback
	)
	.patch(
		feedbackController.addFeedback
	)
	
module.exports = router