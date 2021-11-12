const express = require('express')
const questionController = require('../controllers/question.controller')

const router = express.Router()

router.route('/')
	.get(
		questionController.getQuestions
	)
	.post(
		questionController.addQuestion
	)

router.route('/multiple')
	.post(
		questionController.addQuestions
	)
	
module.exports = router