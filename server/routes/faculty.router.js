const express = require('express')
const facultyController = require('../controllers/faculty.controller')

const router = express.Router()

router.route('/')
	.get(
		facultyController.getFaculties
	)
	.post(
		facultyController.addFaculty
	)
	
module.exports = router