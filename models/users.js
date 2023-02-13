const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    id: {
        type: Number
    },
    birthday: {
        type: String
    }
});



const Users = mongoose.model('users',UsersSchema);


module.exports = Users;