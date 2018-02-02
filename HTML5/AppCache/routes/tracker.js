var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('tracker', { title: 'HTML5 Offline Application' });
});

module.exports = router;
