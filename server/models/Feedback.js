const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({
	subject: {
		type: mongoose.Schema.Types.ObjectId, 
        ref: 'Subject'
	},
	faculty: {
		type: mongoose.Schema.Types.ObjectId, 
        ref: 'Faculty'
	},
	questions: [
		{
			question: {
				type: mongoose.Schema.Types.ObjectId, 
            	ref: 'Question'
			},
			values: [Number]
		}
	],
	count: {
		type: Number,
		default: 0
	}
})

FeedbackSchema.methods = {

	addFeedback: function(answers){
		for(let question of Object.keys(answers)){
			let currQuestion = this.questions.findIndex(e => e.question == question)
			if(currQuestion !== -1){
				this.questions[currQuestion].values[answers[question]-1] += 1
			}
		}
		this.count++
	},

	addQuestions: function(ids){
		for(let id of ids){
			this.questions.push({
				question: id,
				values: [0,0,0,0,0]
			})
		}
	}

}

module.exports = mongoose.model('Feedback',FeedbackSchema)