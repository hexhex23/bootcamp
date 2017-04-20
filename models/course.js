var mongoose = require ('mongoose')
var courseSchema = new mongoose.Schema({
   provider: String,
   title: String,
   subjectarea: String,
   deliverymode: String,
   format: String,
   length: String,
   experiencelevel: String,
   price: Number,
   subsidyavailability: String,
   subsidies: String,
   intakes: String,
   sometopics: String,
   great: String,
   aware: String,
   website: String
})

var Course = mongoose.model('Course', courseSchema)
module.exports = Course
