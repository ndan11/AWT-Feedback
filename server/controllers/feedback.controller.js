const Feedback = require("../models/Feedback")
const { feedbackPopulate } = require("../utils/populateObjects")

module.exports = {

	createFeedback: async(req,res) => {
		try{
			const feedback = new Feedback({
				subject: req.params.subjectId,
				faculty: req.params.facultyId
			})
			feedback.addQuestions(req.body.questions)
			await feedback.save()
			res.status(201).json({
				error: false,
				data: await Feedback.populate(feedback,feedbackPopulate)
			})
		}catch(error){
			res.status(400).json({
				error: true,
				message: getError(error)
			})
		}
	},

	// "questions" : [
	// 	"618e8daf00a5c9547141c01b",
	// 	"618e8e0b00a5c9547141c01d",
	// 	"618e8e1d00a5c9547141c01f",
	// 	"618e9366fb1aac9c5ae06e5c",
	// 	"618e9366fb1aac9c5ae06e5e",
	// 	"618e93eefb1aac9c5ae06e60",
	// 	 "618e93eefb1aac9c5ae06e62",
	// 	 "618e93eefb1aac9c5ae06e64",
	// 	 "618e93eefb1aac9c5ae06e66",
	// 	 "618e93effb1aac9c5ae06e68",
	// 	 "618e93effb1aac9c5ae06e6a",
	// 	 "618e93effb1aac9c5ae06e6c"
	// ]

	// "feedback" : {
	// 	"618e8daf00a5c9547141c01b" : 1,
	// 	"618e8e0b00a5c9547141c01d" : 2,
	// 	"618e8e1d00a5c9547141c01f" : 1,
	// 	"618e9366fb1aac9c5ae06e5c" : 4,
	// 	"618e9366fb1aac9c5ae06e5e" : 1,
	// 	"618e93eefb1aac9c5ae06e60" : 1,
	// 	 "618e93eefb1aac9c5ae06e62" : 2,
	// 	 "618e93eefb1aac9c5ae06e64" : 4,
	// 	 "618e93eefb1aac9c5ae06e64" : 1,
	// 	 "618e93eefb1aac9c5ae06e64" : 3,
	// 	 "618e93eefb1aac9c5ae06e66" : 1,
	// 	 "618e93effb1aac9c5ae06e68" : 3,
	// 	 "618e93effb1aac9c5ae06e6a" : 2,
	// 	 "618e93effb1aac9c5ae06e6c" : 2
	//  }

	addFeedback: async(req,res) => {
		try{
			const feedback = await Feedback.findOne({
				$and : [
					{ subject: req.params.subjectId },
					{ faculty: req.params.facultyId }
				]
			})
			feedback.addFeedback(req.body.feedback)
			await feedback.save()
			res.status(200).json({
				error: false,
				data: await Feedback.populate(feedback,feedbackPopulate)
			})
		}catch(error){
			res.status(400).json({
				error: true,
				message: "Could not add feedback."
			})
		}
	},

	getFeedback : async(req,res) => {
		try{
			const feedback = await Feedback.findOne({
				subject: req.params.subjectId,
				faculty: req.params.facultyId
			})
			res.status(200).json({
				error: false,
				data: await Feedback.populate(feedback,feedbackPopulate)
			})
		}catch{
			res.status(400).json({
				error: true,
				message: "Could not get feedback."
			})
		}
	}

}