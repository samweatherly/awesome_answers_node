var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var QuestionSchema = new Schema({
  title: {type: String, required: true},
  body:  {type: String}
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
