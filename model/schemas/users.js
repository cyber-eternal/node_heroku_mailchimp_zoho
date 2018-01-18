const db = require('../db.js');
const UsersSchema = new db.Schema({
     firstname: {
        type: String,
        match: /^[a-zA-Z ]+/
    },
    fullname: {
        type: String,
        match: /^[a-zA-Z ]+/
    },
    lastname :{
        type: String,
        match: /^[a-zA-Z ]+/
    },
    email : {
        type: String,
        // lowercase: true,
        // match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email']
    },
    // birthdate: {
    //     type: Date,
    //     default: new Date()
    // },
    // address1: {
    //     type: String,
    //     match: /^[a-zA-Z0-9\/ ]+/
    // },
    // address2: {
    //     type: String,
    //     match: /^[a-zA-Z0-9\/ ]+/
    // },
    // country: {
    //     type: String,
    //     match: /^[a-zA-Z ]+/
    // },
    // city: {
    //     type: String,
    //     match: /^[a-zA-Z ]+/
    // },
    // postal_code:{
    //     type: Number,
    //     match: /^[0-9]+/
    // },
    zoho_id:{
        type: String
    }
});

const users = db.model('user', UsersSchema);

module.exports = users;