import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    coding : {
        type: String,
        required: true,
        unique: true
    },
    url : {
        type: String,
        required: true,
        unique: true
    }
})

const Code = mongoose.model('short_url',urlSchema);
export default Code;