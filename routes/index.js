
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'My new express app' });
};