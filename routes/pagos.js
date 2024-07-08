var express = require('express');
var router = express.Router();

/* GET pagos page. */
router.get('/', function(req, res, next) {
  res.render('pagos');
});

module.exports = router;