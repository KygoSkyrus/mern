const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        // required: true,
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
        default: ""
    },
    address: {
        house: { type: String, default: "" },
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        pincode: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "" },
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
    checkoutSession: [{
        sessionId: { type: String },
        orderId: { type: String },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    orders: [{
        products: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PRODUCT',
            },
            name: {
                type: String,
            },
            image: {
                type: String,
            },
            quantity: {
                type: Number,
            },
            discount: {
                type: Number,
            },
            price: {
                type: Number,
            }
        }],
        orderId: {
            type: String,
        },
        tax: {
            type: Number,
        },
        shipping: {
            type: Number,
        },
        total: {
            type: Number,
        },
        payment_status: {
            type: String,
        },
        receiptUrl: {
            type: String
        },
        shippingAddress: {

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
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: "users" });


//mongoose virtual to minimize performance overhead created by frequently calling populate
//technincally mongose virtual dont work on field with array so it will create another field and populate them
userSchema.virtual('cartProducts', {
    ref: 'PRODUCT',
    localField: 'cart.productId',
    foreignField: '_id',
    justOne: false, // Set to true if you want only one item in the array
    options: { autopopulate: true }, // Enable automatic population
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });


//hashing password
// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 12);
//     }
//     next();
// });

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRETKEY);//generrates JWT token
        //this.tokens = this.tokens.concat({ token: token });//no need to save token in db
        let user = await this.save();
        return { token, user };
    } catch (err) {
        console.log(err);
    }
}

//connecting with collection
module.exports = mongoose.model('USER', userSchema);