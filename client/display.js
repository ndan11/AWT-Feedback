let data = {}
let feedback = {}

const courseSelect = document.getElementById('course')
const facultySelect = document.getElementById('faculty')
const table = document.getElementById('table')

const semester = document.getElementById('semester')
const degree = document.getElementById('degree')
const academicYear = document.getElementById('academicYear')
const studentCount = document.getElementById('studentCount')
const feedbackCount = document.getElementById('feedbackCount')
const overallFeedback = document.getElementById('overallFeedback')

courseSelect.addEventListener('change', (event) => {
	updateFacultySelectData()
})

facultySelect.addEventListener('change', (event) => {
	getFeedback()
})

const getData = async () => {
	fetch('http://localhost:5000/api/v1/subjects')
		.then(res => res.json())
		.then(body => {
			data = body.data
			updateCourseSelectData()
		})
		.catch(err => console.log(err))
}

const updateCourseSelectData = () => {
	let tempHtml = ''
	for(let course of data){
		tempHtml += `<option value='${course._id}'>${course.code + ' ' + course.name}</option>`
	}
	courseSelect.innerHTML = tempHtml
	updateFacultySelectData()
}

const updateFacultySelectData = () => {
	let tempHtml = ''
	let currCourse = data.find(e => e._id === courseSelect.value)
	for(let faculty of currCourse.faculties){
		tempHtml += `<option value='${faculty._id}'>${faculty.name}</option>`
	}
	facultySelect.innerHTML = tempHtml
	console.log("Hello")
	getFeedback()
}

const getFeedback = async () => {
	fetch(`http://localhost:5000/api/v1/subjects/${courseSelect.value}/faculty/${facultySelect.value}`,{
		method: 'GET'
	})
		.then(res => res.json())
		.then(body => {
			feedback = body.data
			addQuestions()
			semester.innerHTML = feedback.subject.semester
			degree.innerHTML = `${feedback.subject.institute} (${feedback.subject.degree})`
			academicYear.innerHTML = feedback.subject.academicYear
			studentCount.innerHTML = feedback.subject.students
			feedbackCount.innerHTML = feedback.count
		})
		.catch(err => console.log(err))
}

const addQuestions = () => {
	var rowCount = table.rows.length;
	table.innerHTML = ''
	let overall = 0
  	feedback.questions.forEach(({question,values},index) => {
        let row = table.insertRow(index);
        row.innerHTML=`
		<tr id="${question._id}">
			<td>${index+1}</td>
			<td
				style="width: 700px"
			>
				<br>
				${question.text}
			</td>
			<td>Completly Agree    <br/> ${values[0]} (${(values[0]/feedback.count*100).toFixed(2)}%) </td>
			<td>Agree Upto 75%     <br/> ${values[1]} (${(values[1]/feedback.count*100).toFixed(2)}%)</td>
			<td>Agree Upto 50%     <br/> ${values[2]} (${(values[2]/feedback.count*100).toFixed(2)}%)</td>
			<td>Agree upto 25%     <br/> ${values[3]} (${(values[3]/feedback.count*100).toFixed(2)}%)</td>
			<td>Completly Disagree <br/> ${values[4]} (${(values[4]/feedback.count*100).toFixed(2)}%)</td>
		</tr>`
		let max = Number.MIN_VALUE
		for(let i in values){
			if(max < (values[i]/feedback.count*100)){
				max = (values[i]/feedback.count*100)
			}
		}
		overall += max;
    })
	overallFeedback.innerHTML = `${(overall/12).toFixed(2)}%`
}

getData()
