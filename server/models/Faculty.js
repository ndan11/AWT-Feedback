const mongoose = require('mongoose')

const FacultySchema = mongoose.Schema({
	name: {
		type: String,
		match: [/[a-zA-Z ']/,"Name is not valid."],
		required: "Name is required."
	}
})

module.exports = mongoose.model('Faculty',FacultySchema)