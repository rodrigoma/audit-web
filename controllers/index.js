var model = require('../models/validate');

module.exports = function (app) {
    app.get('/', function (req, res) {
        model.getAll(function (result) {
            console.log('--> CHAMOU GET ALL');
            res.render('index', {
                validates: result
            });
        });
    });
};