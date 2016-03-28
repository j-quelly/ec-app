/** 
 * Index route
 */

// dependencies 
var express = require('express'),
    router = express.Router();

// GET home page. 
router.get('/', function(req, res, next) {

    // render page and set one var for title
    res.render('index', {
        title: 'Edmodo'
    });

});

// expose this
module.exports = router;
