const Subject = require('../models/Subject')
const getError = require('../utils/dbErrorHandler')
const { subjectPopulate } = require('../utils/populateObjects')

module.exports = {

	addSubject : async(req,res) => {
		try{
			const subject = new Subject({
				...req.body
			})
			await subject.save()
			res.status(201).json({
				error: false,
				data: Subject.populate(subject,subjectPopulate)
			})
		}catch(error){
			res.status(400).json({
				error: true,
				message: getError(error)
			})
		}
	},

	addFacultytoSubject : async(req,res) => {
		try{	
			const subject = await Subject.findById(req.params.id)
			if(subject){
				subject.addFaculty(req.body.facultyId)
				await subject.save()
				res.status(200).json({
					error: false,
					data: Subject.populate(subject,subjectPopulate)
				})
			}else{
				res.status(404).json({
					error: true,
					message:  "Subject does not exist."
				})
			}
		}catch(error){
			let err = getError(error)
			res.status(400).json({
				error: true,
				message:  err === ''? "Could not add faculty to subject." : err
			})
		}
	},

	getSubjects : async(req,res) => {
		try{
			const subjects = await Subject.find({}).populate(subjectPopulate)
			res.status(200).json({
				error: false,
				data: subjects
			})
		}catch(error){
			console.log(error)
			res.status(400).json({
				error: true,
				message: "Could not get subjects."
			})
		}
	}

}