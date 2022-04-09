var mongoose = require("mongoose");

var chartSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    growth:[
        {
            country:String,
            number:Number,
        }
    ]
})


module.exports = mongoose.model("Chart", chartSchema);