const express = require('express')
const connectDB = require('./config/database')
const cors = require('cors')
const pollRouter = require('./router/pollRouter')

const app = express()

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
  }))

app.use(express.json())

app.use("/", pollRouter )


connectDB()
    .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
        console.log("Server is successfully listening on port 7777...");
    })
    })
    .catch(() => {

    })