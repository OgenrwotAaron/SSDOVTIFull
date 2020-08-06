const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path')

const db = require('./config/database');

//test db
db.authenticate()
.then(res=>console.log('Database connected'))
.catch(e=>console.log(e))

const app = express();

app.use(bodyParser.json())

app.use(morgan('tiny'))

app.use(express.static(path.join(__dirname,'..','client','build')))

//routes
app.use('/api/v1/students',require('./routes/students'));
app.use('/api/v1/teachers',require('./routes/teachers'));
app.use('/api/v1/courses',require('./routes/courses'));
app.use('/api/v1/modules',require('./routes/modules'));
app.use('/api/v1/units',require('./routes/units'));
app.use('/api/v1/videos',require('./routes/videos'));
app.use('/api/v1/files',require('./routes/files'));
app.use('/api/v1/admins', require('./routes/admins'))
app.use('/api/v1/users',require('./routes/users'));
app.use('/api/v1/hods',require('./routes/hods'))

app.get('*',(req,res)=>{
	res.sendFile(path.resolve(__dirname,'..','client','build','index.html'))
})

const PORT = process.env.PORT || 5500

app.listen(PORT,()=>{
	console.log(`Server listening on port ${PORT}`)
})