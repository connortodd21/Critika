var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
var authenticate = require('../middleware/auth');

mongoose.connect(process.env.MONGODB_HOST);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/* Objects */
var User = require('../model/user');

router.get("/", function (req, res) {
    res.send('This route is for all user related tasks');
});

/* Register */
router.post("/register", (req, res) =>{
    if (!req.body || !req.body.email || !req.body.password || !req.body.username || !req.body.securityquestion) {
        res.status(400).send({ message: "User data is incomplete" });
        return;
    }
    /* User Data */
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        securityquestion: req.body.securityquestion,
        verified: false
    });


    /* Add to database */
    newUser.save().then(() => {
        return newUser.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(newUser);
    }).catch((err) => {
        res.status(400).send(err)
    })
});

/* Send email
router.post("/email", (req, res) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'critika.app@gmail.com',
            pass: '307group2018'
        }
    });

    var mailOptions = {
        from: 'critika.app@gmail.com',
        to: 'kensodetz@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'This is a test'
    };

    console.log("Sending...")
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
            res.status(400).json({ message: "Email Error" });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: "Email Sent" });
        }
    });

});
*/

/* View Account */
router.get("/account", authenticate, (req, res) => {
    res.send(req.user);
});

/* Login */
router.post("/login", (req, res) => {
    if (req.body.username && req.body.password) {
       User.findByLogin(req.body.username, req.body.password).then((user) => {
           return user.generateAuthToken().then((token) => {
               res.header('x-auth', token).send(user);
           });
       }).catch((err) => {
           res.status(400).send({ message: "Error logging in"});
       });
    }
    else {
        res.status(400).send({ message: "Login information is incomplete" });
        return;
    }
});

/* Change Password */
router.post("/change-password", authenticate, (req, res) => {
    var username = req.user.username;
    var newPassword = req.body.password;
    
    User.findOneAndUpdate({username : username}, { $set : {password : newPassword}}).then(() =>{
        res.status(200).send({message: 'Password was successfully changed!'});
    }).catch((err) => {
        res.status(400).send({ message: "Login information is incomplete" });
        res.send(err);
    });
})



module.exports = router;