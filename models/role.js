const mongoose = require("mongoose");
const rolemodel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: { type: String, required: true },    
    role: {
        type: String,
        enum: ['admin','client','facteur','chef']
    },
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
}, {

    versionKey: false
});
module.exports = mongoose.model('role', rolemodel);
