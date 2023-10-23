const express = require('express')
const connect = require('./server/conn')
const cors = require('cors')
const auth = require('./routes/Auth')
const post = require('./routes/Post')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/api/Auth',auth)
app.use('/api/Post',post)

// connecting mysql
connect.connect((err)=>{
    if(err){
        console.log("Something went wrong" + err);
    } else{
        console.log('Connecting mysql successfully !');
    }
})

// connecting server
app.listen(port,()=>{
    console.log(`Server is running in port ${port}`);
})