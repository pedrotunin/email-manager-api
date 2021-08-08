const ApiReturn = require('../views/ApiReturn');

module.exports = async function(req, res, next) {

    const ip_address = req.connection.remoteAddress;

    if (ip_address != '::1') {

        res.status(403);
        res.json(ApiReturn.error('You dont have access to these resources'));
        return;
    
    } else next();

};