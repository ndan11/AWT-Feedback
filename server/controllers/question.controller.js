const Question = require('../models/Question')

module.exports = {

	addQuestion : async(req,res) => {
		try{
			const question = new Question({
				...req.body
			})
			await question.save()
			res.status(201).json({
				error: false,
				data: question
			})
		}catch(error){
			res.status(400).json({
				error: true,
				message: getError(error)
			})
		}
	},

	addQuestions : async(req,res) => {
		try{
			let ids = []
			for(let text of req.body.text){
				const question = new Question({
					text: text
				})
				await question.save()
				ids.push(question._id)
			}
			res.status(201).json({
				error: false,
				data: ids
			})
		}catch(error){
			res.status(400).json({
				error: true,
				message: getError(error)
			})
		}
	},

	getQuestions : async(req,res) => {
		try{
			const questions = await Question.find({})
			res.status(200).json({
				error: false,
				data: questions
			})
		}catch{
			res.status(400).json({
				error: true,
				message: "Could not get questions."
			})
		}
	}

}