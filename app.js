const express = require("express");
const path = require("path")
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true ,useUnifiedTopology: true });
const port = 8000;

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("we are connected");
// }); 

// define mongoose Schema
const contactSchema = new mongoose.Schema({
            name: String,
            age: String,
            phoneno: String,
            email: String,
            address: String
     
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));// For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {

    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the databse");

    }).catch(() => {
        res.status(400).send("Item was not saved to Database");
    })
    // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});