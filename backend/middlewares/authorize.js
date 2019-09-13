const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
        jwt.verify(req.body.accessToken, 'shehab');
        req.body.username = jwt.decode(req.body.accessToken).username;
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Unauthorized access' });
    }
}