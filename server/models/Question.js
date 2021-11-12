const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
	text: {
		type: String,
		required: "Question Text is required.",
		trim: true
	}
})

module.exports = mongoose.model('Question',QuestionSchema)