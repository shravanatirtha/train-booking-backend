const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    adhaar: {
        type: String
    },
    
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
  
},
{
    timestamps: true,
    collection: "user",
  })

const user = module.exports = mongoose.model('User', userSchema)