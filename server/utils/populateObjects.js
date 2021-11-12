module.exports = {

	subjectPopulate : [
		{
			path: 'faculties',
			select: 'name'
		}
	],

	feedbackPopulate : [
		{
			path: 'subject',
			select: 'code name institute degree semester students academicYear'
		},
		{
			path: 'faculty',
			select: 'name'
		},
		{
			path: 'questions',
			populate: {
				path: 'question',
				select: 'text'
			}
		}
	]

}