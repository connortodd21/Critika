var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
var authenticate = require('../middleware/auth');

mongoose.connect(process.env.MONGODB_HOST, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Objects */
var Submission = require('../model/submission');
var User = require('../model/user');
var Community = require('../model/community')
var Feedback = require('../model/feedback')

/**
 * All feedback related routes
 */
router.get("/", (req, res) => {
    res.send('This route is for all feedback related tasks');
});

/*
 * Add new feedback
 * Each user can only give one feedback
 */
router.post('/add-feedback', (req, res) => {
    if(!req.body || !req.body.username || !req.body.feedbackSubject || !req.body.feedbackMessage || !req.body.submissionID){
        res.status(400).json({ message: "Report comment data is incomplete" });
        return;
    }

  // New Community Data
  var newFeedback = new Feedback({
      username: req.body.username,
      feedbackMessage: req.body.feedbackMessage,
      feedbackSubject: req.body.feedbackSubject,
      submissionID: req.body.submissionID,
    });

    Feedback.find({username: req.body.username}).then((subs) => {
        if(req.body.username == sub[0].username){
            res.status(400).json({ message: "You have already given feedback to this submission" });
            return;
        }
    })

    // Add to database 
    newFeedback.save().then(() => {
        res.status(200).send(newFeedback)
    }).catch((err) => {
        res.status(400).send(err);
    })
})

/*
 * Rate feedback from 1-5. only the owner of this submission can do this
 */
router.post('/rate-feedback', authenticate, (req, res) => {
    if(!req.body || !req.body.username  || !req.body.submissionID || !req.body.feedbackRating){
        res.status(400).json({ message: "Report comment data is incomplete" });
        return;
    }
    Submission.find({_id: req.body.submissionID}).then((subs) => {
        if(req.body.username != subs[0].username){
            res.status(400).json({ message: "You are not the owner of this post to rate the feedback" });
            return;
        }
    })
   
    Feedback.findOneAndUpdate({submissionID:  req.body.submissionID}, 
        {
            $set: 
            {feedbackRating: req.body.feedbackRating}
        }).then(() => {
            res.status(200).send({message: "Feedback has been rated!"})
        }).catch((err) => {
            res.status(400).send({ message: "Error changing information" });
            res.send(err);
        })
})

/*
 * Get all feedback for a given submission
 */
router.get('/all', authenticate, (req, res) => {
    Feedback.find({submissionID: req.headers.submissionid}).then((subs) => {
        res.send(subs)
    }).catch((err) => {
        res.status(400).send(err)
    })
})



module.exports = router;