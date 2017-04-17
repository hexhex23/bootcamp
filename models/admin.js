var mongoose = require('mongoose')
var bcrypt   = require('bcryptjs')

var adminSchema = mongoose.Schema({

        local: {
        email: String,
        password: String,
    }
})

adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

adminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('Admin', adminSchema)
