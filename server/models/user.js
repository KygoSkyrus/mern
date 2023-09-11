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
    },
    avtar: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
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
            },
            quantity: {
                type: Number,
            },
        }],
        total: {
            type: Number,
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


//mongoose virtual to minimize performance overhead created by frequently calling populate
//technincally mongose virtual dont wont on field with array so it will creeate another field and populate them
userSchema.virtual('cartProducts', {
    ref: 'PRODUCT',
    localField: 'cart.productId',
    foreignField: '_id',
    justOne: false, // Set to true if you want only one item in the array
    options: { autopopulate: true }, // Enable automatic population
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });


// userSchema.virtual('wishlistProducts', {
//     ref: 'Product',
//     localField: 'wishlist.productId',
//     foreignField: '_id',
//     justOne: false
// });

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
        console.log('did i ran')
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

//connecting with collection
module.exports = mongoose.model('USER', userSchema);