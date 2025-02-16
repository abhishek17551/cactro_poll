const { text } = require('express')
const mongoose = require('mongoose')

const PollSchema = new mongoose.Schema({
    question : {
        type : String,
        required : true
    },
    options : [
        {
            text : {
                type : String,
                required : true
            },
            voteCount : {
                type : Number,
                default : 0
            }
        }
    ]
},
{
    timestamps: true
})

module.exports = mongoose.model('Poll', PollSchema)