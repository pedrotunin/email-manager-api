require('dotenv').config();

const ApiReturn = require('../views/ApiReturn');

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = function(req, res, next) {

    const authToken = req.headers['authorization'];

    if (authToken == undefined) {
        res.status(403);
        res.json(ApiReturn.error("No authentication token given! Please, login first."));
        return;
    }

    const token = authToken.split(' ')[1];

    try {
        
        const decoded = jwt.verify(token, secret);
        if (decoded) next();

    } catch (error) {

        res.status(403);
        res.json(ApiReturn.error("You are not authenticated! Send another token."));
        return;
        
    }

}