const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { Schema } = mongoose;

const authSchmema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is a required field']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is a required field']
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Email is an required field'],
        unique: true
    },
    password: {
        type: String,
        min: [6, 'Password must be 6 in length'],
        required: [true, 'Password is required field']
    },
    confirmPassword: {
        type: String,
        validate: {
            validator:  function (e) {
                const isMatched = bcrypt.compareSync(e, this.password); 
                if(isMatched){
                    this.confirmPassword = undefined
                }else{
                    return false
                }
            },
            message: props => `passwords are not matched`
        },
        required: true
    },
    token: String
})

exports.User = mongoose.model('User', authSchmema);