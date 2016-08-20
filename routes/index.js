var authenticator = require('./user.js')
api = require('./../api.js')

/* GET home page. */
exports.index =  function(req, res) {
  api.getRenderParam(req,res,0);
};

exports.index_history =  function(req, res) {
  api.getRenderParam(req,res,1);

};

exports.notfound =  function(req, res) {
  res.render('404', { title: '404未找到' })

};

exports.login = function(req, res){
  res.render('login', { title: '登录' })
};

exports.logout = function(req, res){
  req.session.user = null;
  res.render('logout', { title: '退出登录' })
};

exports.admin = function(req, res){
  res.render('admin', { title: '后台管理' })
};

exports.history = function(req, res){
  api.getHistory(req,res);
};

exports.getDetail = function(req, res){
  api.getDetail(req,res);
};

exports.getLyric = function(req, res){
  api.getLyric(req,res);
};

exports.addMusic = function(req, res){
  api.addMusic(req,res);
};

exports.dologin = function(req, res) {
  //res.render('logout', { title: '退出登录' })
  var user = req.body.username;
  var pwd = req.body.password;
  var ip = req.ip;
  authenticator.checkUser(user, pwd, function (result) {
    if (result) {
      req.session.user = user;
      res.redirect("/admin");
    } else {
      res.redirect("/login");
    }

  });
};

