const formidable = require('formidable');
const path = require('path')
const fs = require('fs')

module.exports = function (req, res, next) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.status(500).json({ errmsg: "Internal Error" });
        } else {
            req.body.files = files;
            req.body.fields = fields;
            req.body.accessToken = fields.accessToken;
            delete req.body.fields.accessToken;
            next();
        }
    });
}

