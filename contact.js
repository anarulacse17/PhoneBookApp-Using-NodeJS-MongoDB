var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Contact = new Schema(
    {
        name : String,
        DOB:String,
        email:String,
        phone:String
    }

);

mongoose.model('contacts', Contact);
mongoose.connect('mongodb://localhost:27017/contact',{ useNewUrlParser: true,useUnifiedTopology: true })
.then(res => console.log('Connected to db'));

