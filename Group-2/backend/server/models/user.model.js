import mongoose from 'mongoose';

const Userschema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
}, { collection: 'ex_user' });

const User = mongoose.model("User", Userschema);
export default User;