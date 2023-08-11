const mongoose = require("mongoose");

const reportsSchema = mongoose.Schema({
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post"
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Report = mongoose.model("Report", reportsSchema);
module.exports = Report;