var express = require('express');
var router = express.Router();

/* POST geoupload page. */
router.post('/', function(req, res, next) {
    res.send(req.body);
});

module.exports = router;
