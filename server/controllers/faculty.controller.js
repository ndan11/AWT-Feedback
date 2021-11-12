const Faculty = require("../models/Faculty")

module.exports = {
	
	addFaculty : async(req,res) => {
		try{
			const faculty = new Faculty({
				...req.body
			})
			await faculty.save()
			res.status(201).json({
				error: false,
				data: faculty
			})
		}catch(error){
			res.status(400).json({
				error: true,
				message: getError(error)
			})
		}
	},

	getFaculties : async(req,res) => {
		try{
			const faculties = await Faculty.find({})
			res.status(200).json({
				error: false,
				data: faculties
			})
		}catch{
			res.status(400).json({
				error: true,
				message: "Could not get faculties."
			})
		}
	}
	
}