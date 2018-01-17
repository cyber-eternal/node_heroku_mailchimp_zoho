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
    birthdate: {
        type: Date,
        default: new Date()
    },
    address1: {
        type: String,
        match: /^[a-zA-Z0-9\/ ]+/
    },
    address2: {
        type: String,
        match: /^[a-zA-Z0-9\/ ]+/
    },
    country: {
        type: String,
        match: /^[a-zA-Z ]+/
    },
    city: {
        type: String,
        match: /^[a-zA-Z ]+/
    },
    postal_code:{
        type: Number,
        match: /^[0-9]+/
    },
    zoho_id:{
        type: String
    }
});

const users = db.model('user', UsersSchema);

module.exports = users;