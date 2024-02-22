const jwt = require('jsonwebtoken');
const USER = require('../models/user');

const authenticateAdmin = async (req, res, next) => {
    const token = req.cookies.ajwt;
    if (!token)
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });

    const { _id } = jwt.verify(token, process.env.SECRETKEY);
    let user = await USER.findOne({ _id })
    if (!user) {
        return res.status(404).json({ message: 'User not found.', is_user_logged_in: false });
    }

    if ((user.role !== "admin" && user.email !== process.env.ADMIN_ID) && (user.role !== "guest" && user.email !== process.env.GUEST_USER)) {
        return res.status(404).json({ message: 'Authentication failed!!!', is_user_logged_in: false });
    }

    req.user = user;//this may not be needed for admin
    next();
};

const checkAcessRights = async (req, res, next) => {
    const endpoint =  req.url.split('?')[0];
    console.log('hdfbds, re',endpoint, req.user?.role)
    if (req.user?.role === "guest" && (endpoint !== "/getorders" && endpoint !== "/getusers" && endpoint !== "/signmeout")) {
        return res.status(403).json({ message: 'Guest user does not have rights to perform this actions', is_user_logged_in: true, user: req.user });
    }
    next();
};

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token)
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });

    const { _id } = jwt.verify(token, process.env.SECRETKEY);
    let user = await USER.findOne({ _id }).populate('cartProducts')//populating field by mongoose virtual
    //populating with regular populate which can cause performnace overhead
    // const user = await USER.findById(decoded._id).populate('cart.productId').populate('wishlist.productId');
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    req.user = user;
    next();
};


module.exports = { authenticateAdmin, authenticateUser, checkAcessRights }