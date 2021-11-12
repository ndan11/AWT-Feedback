const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const subjectRouter = require('./routes/subject.router')
const facultyRouter = require('./routes/faculty.router')
const questionRouter = require('./routes/question.router')

const port = process.env.PORT || 5000
const mongo_url = process.env.MONGO_URL

const app = express();

mongoose.connect(mongo_url,{ 
	useNewUrlParser: true, 
	useUnifiedTopology: true
});

app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({limit : '50mb', extended : false}));
app.use(cors({
    origin : '*'
}))

app.use('/api/v1/subjects',subjectRouter)
app.use('/api/v1/faculty',facultyRouter)
app.use('/api/v1/questions',questionRouter)

app.listen(port, ()=>{
    console.log(`Server Running on ${port}`)
});