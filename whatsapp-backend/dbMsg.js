import mongoose from "mongoose";
const {Schema} =mongoose;

const whatsappschema = new Schema({
    message: {
       type: String
    },
    // name: {
    //     type: String
    // },
    // timestamp: {
    //     type: String
    // },
    // recieved: {
    //     type: Boolean
    // },
});

export default mongoose.model("messagecontent",whatsappschema);
