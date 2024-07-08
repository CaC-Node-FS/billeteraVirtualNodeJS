var express = require('express');
var router = express.Router();

/* GET transferencias page. */
router.get('/', function(req, res, next) {
  res.render('transferencias');
});

module.exports = router;