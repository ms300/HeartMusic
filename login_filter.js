/**
 * Created by shi on 2016/8/19.
 */

exports.authorize = function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}