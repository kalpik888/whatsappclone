import mongoose from 'mongoose'

const whatsappschema= mongoose.Schema({
    message: String,
    name:String,
    times: String,
    rec: Boolean
});

export default mongoose.model('messageconts',whatsappschema)