const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    features: {
        type: Object,
        default: {},
        required: false
    },
    role: {
        type: String,
        enum: ['admin', 'merchant', 'user'],
        default: 'user',
        required: true
    },
    refreshToken: { 
        type: String 
    }
    ,
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        collection: 'User',
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;

