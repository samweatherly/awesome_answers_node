var express  = require("express"),
    router   = express.Router(),
    Question = require("../models/question");

router.get("/new", function(request, response, next){
  // response.end("Create New Question");
  response.render("questions/new", {errors: {}});
});

router.post("/", function(request, response, next){
  var question = new Question({title: request.body.title,
                               body:   request.body.body});
  question.save(function(err, question){
    if(err) {
      response.render("questions/new", {errors: err.errors});
    } else {
      response.redirect("/questions/" + question._id);
    }
  });
});

router.get("/:id", function(req, res) {
  Question.findOne({_id: req.params.id}, function(err, question){
    if(err) {
      res.render('error', {message: "Question not found",
                           error: {status: 404}});
    } else {
      res.render("questions/show", {question: question});
    }
  });
});

// update
router.get("/:id/edit", function(req, res){
  Question.findOne({_id: req.params.id}, function(err, question){
    if(err) {
      res.render('error', {message: "Question not found",
                           error: {status: 404}});
    } else {
      res.render("questions/edit", {question: question, errors: {}});
    }
  });
});

// update
router.patch("/:id", function(req, res){
  Question.findOne({_id: req.params.id}, function(err, question){
    if(err) {
      res.render('error', {message: "Question not found",
                           error: {status: 404}});
    } else {
      question.title = req.body.title;
      question.body  = req.body.body;
      question.save(function(err){
        if(err) {
          res.render("questions/edit", {errors: err.errors, question: question});
        } else {
          res.redirect("/questions/" + question._id);
        }
      });
    }
  });
});

// index
router.get("/", function(req, res){
  Question.find({}, function(err, questions){
    if(err) {
      res.render('error', {message: "Error Happend!", error: {status: 500}});
    } else {
      res.render("questions/index", {questions: questions});
    }
  });
});


//destroy
router.delete("/:id", function(req, res) {
  Question.remove({_id: req.params.id}, function(err, question){
    if (err) {
      res.render('/questions/' + question.id, {errors: err.errors, question: question});
    } else {
      res.redirect("/questions");
    }
  });
});

module.exports = router;
