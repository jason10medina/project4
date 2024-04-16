function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    req.flash('error', 'Please log in to view that resource');
    res.redirect('/users/login');
}

module.exports = { ensureAuthenticated };
