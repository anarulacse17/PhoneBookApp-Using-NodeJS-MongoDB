const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact = new Schema(
    {
        name : String,
        DOB:String,
        email:String,
        phone:String
    }

);
mongoose.model('contacts', Contact);
const URI='mongodb+srv://Aseem:1234@cluster0-wobyr.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(URI, { useNewUrlParser: true }, (err) => {
        if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Database has been connected ');
})


