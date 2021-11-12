const mongoose = require('mongoose')

const SubjectSchema = mongoose.Schema({
	code: {
		type: String,
		required: "Subject Code is required.",
		unique: "Subject Code must be unique."
	},	
	name: {
		type: String,
		match: [/[a-zA-Z ]/,"Subject Name is not valid."],
		required: "Subject Name is required."
	},
	institute: {
		type: String,
		enum: {
			values: ['CSPIT','DEPSTAR'],
			message: "Institute is not valid."
		},
		required: "Institute is required."
	},
	degree: {
		type: String,
		enum: {
			values : ['CE','IT','CSE','EC','ME','CL'],
			message: "Degree is not valid.",
		},
		required: "Degree is required."
	},
	semester: {
		type: Number,
		min: [1,"Semester is not valid."],
		max: [8,"Semester is not valid."],
		required: "Semester is required."
	},
	students: {
		type: Number,
		min: [0,"Student Count is invalid."],
		required: "Student Count is required."
	},
	academicYear: {
		type: String,
		required: "Academic Year is required."
	},
	faculties: [
		{
			type: mongoose.Schema.Types.ObjectId, 
            ref: 'Faculty'
		}
	]
})

SubjectSchema.methods = {

	addFaculty : function(id){
		if(!this.hasFaculty(id)){
			this.faculties.push(id)
		}
	},

	hasFaculty : function(id){
		return this.faculties.find(e => e == id)
	}

}

module.exports = mongoose.model('Subject',SubjectSchema)