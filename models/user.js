var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    boardIDs: Array,
    token: String
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(testPassword, cb) {
    bcrypt.compare(testPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.statics.generateUniqueToken = function(emailString){
    //make this synchronous, or else it can be instantiated to nothing
    return bcrypt.hashSync(emailString + Date.now(), SALT_WORK_FACTOR);
};

module.exports = mongoose.model('User', UserSchema);