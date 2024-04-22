require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const taskRouter = require('./route/task');
const authRouter = require('./route/auth');
const app = express();
const path = require('path')


//cors 
app.use(cors());

// body parser
app.use(express.json());

//severstatic files
app.use(express.static(process.env.PUBLIC_DIR))

//route
app.use('/api/v1/tasks', taskRouter.router)
app.use('/api/v1/users', authRouter.router);

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})


// database connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todoDatabase');
    console.log('database is connected successfully')
}

// server connection
app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log(`server is connected to ${process.env.PORT}`);
    }
})