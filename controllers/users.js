const User = require('../models/user');


module.exports.renderRegister = (req ,res)=> {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try{ 
    const {username, email, password} = req.body;
    const user = await new User({username, email});
    // take the password to the new user
    const registeredUser = await User.register(user, password);
    // we register the user and logged in
    console.log(registeredUser);
    req.login(registeredUser, err => {
        if(err) return next(err);
        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
    })
}catch(e){
    req.flash('error', e.message);
    res.redirect('register');
}
}

module.exports.renderLogIn = (req, res)=> {
    res.render('users/login')
}

module.exports.logIn = (req, res)=> {
    req.flash('success', "welcome back!");
    // someone may directly go to the log in page, so it will set the returnto and default page to go
    const redirectUrl = req.session.returnTo || '/campgrounds';
    // delete the returnTo info
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logOut = (req, res) => {
    req.logout();
    req.flash('success', "GoodBye");
    res.redirect('/campgrounds');
}