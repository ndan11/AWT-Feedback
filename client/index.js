let data = {}
let questions = []
const courseSelect = document.getElementById('course')
const facultySelect = document.getElementById('faculty')
const table = document.getElementById('table');

courseSelect.addEventListener('change', (event) => {
	updateFacultySelectData()
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
	getQuestions()
}

const getQuestions = async () => {
	fetch(`http://localhost:5000/api/v1/subjects/${courseSelect.value}/faculty/${facultySelect.value}`,{
		method: 'GET'
	})
		.then(res => res.json())
		.then(body => {
			questions = body.data.questions
			addQuestions()
		})
		.catch(err => console.log(err))
}

const addQuestions = () => {
	var rowCount = table.rows.length;
	table.innerHTML = ''
  	questions.forEach(({question},index) => {
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
			<td>Completly Agree    <input type="radio" name="${question._id}" value="1"></td>
			<td>Agree Upto 75%     <input type="radio" name="${question._id}" value="2"></td>
			<td>Agree Upto 50%     <input type="radio" name="${question._id}" value="3"></td>
			<td>Agree upto 25%     <input type="radio" name="${question._id}" value="4"></td>
			<td>Completly Disagree <input type="radio" name="${question._id}" value="5"></td>
		</tr>`;
    });
}

const submit = () => {
	let apiRequest = {}
	for(let {question} of questions){
		let ele = document.querySelector(`input[name="${question._id}"]:checked`)
		if(ele){
			apiRequest[question._id] = ele.value
		}else{
			alert("Fill in all the questions.")
			return
		}
	}
	for(let {question} of questions){
		let ele = document.querySelector(`input[name="${question._id}"]:checked`)
		ele.checked = false
	}
	fetch(`http://localhost:5000/api/v1/subjects/${courseSelect.value}/faculty/${facultySelect.value}`,{
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			feedback : apiRequest
		})
	})
		.then(res => res.json())
		.then(body => {
			if(body.error){
				alert('An error occurred.')
			}else{
				alert('Feedback recorded successfully.')
			}
		})
		.catch(err => console.log(err))
}

getData()