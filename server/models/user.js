const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: false,
    },
    address: {
        house: String,
        street: String,
        city: String,
        pincode: String,
        state: String,
        country: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PRODUCT',
    }],
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PRODUCT',
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
    }],
    orders: [{
        products: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PRODUCT',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        }],
        total: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ]
}, { collection: "users" });

//hashing password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

//issuing jwt
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRETKEY);//to generrate token
        this.tokens = this.tokens.concat({ token: token });//here the second token is the token generated in the above line
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

//connecting with collection
module.exports = mongoose.model('USER', userSchema);