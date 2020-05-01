module.exports = function (req, res) {
    let resData = {message:"Add User"};
    res.render('home', resData);
}