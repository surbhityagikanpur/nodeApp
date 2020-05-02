'use strict';
/**
 * Module dependencies.
 */

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('config'); // get our config file
// =======================
// configuration =========
// =======================
let port = process.env.PORT || config.port;
let userSchema = require('./schema/users');
let docSchema = require('./schema/documents')

const connection = async () => {
    try{
        await mongoose.connect('mongodb://localhost/my_database', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('server is running')
    } catch(err) {
        console.log('error: '+ err)
    }
}
connection();

console.log("MongoDb Connection: ", config.dbURL);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);

//app.use(express.static(__dirname + '/public')); not using this currently 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/api/user', (req, res)=>{
    const preSave = async () => {

        let arr = [];
        const arrid = new Promise((resolve, reject) => {
            userSchema.find({}, function(err, users){
                users.forEach(function(user) {
                    arr.push(user.id)
            })
            resolve(arr);
            });
        });

        let arrId = await arrid;

        const mapDocument = new Promise((resolve, reject) => {

            docSchema.find({}, 'userId text', function(err, docs){
                let requests = arrId.map(async (id) => docs.filter((el)=>{
                    return el.userId == id;
                }));
                resolve(requests);
            })
        })

        let requests = await mapDocument;
        return requests;
    }
    preSave().then((result)=>{
        Promise.all(result).then((res) =>{
        res.forEach((el)=>{
            if(el.length > 0) {
                el.forEach((document)=>{
                    let userId = document.userId;
                    let docId = document._id;
                    console.log(userId, docId);

                    let condition = {
                        id: userId
                    }
                    userSchema.updateOne(condition, {$addToSet: {documents: docId}}, (err, updated) => {
                        console.log(updated)
                    })
                })
            }
        })   
        })
    })
    .catch((err)=>{console.log(err)});
});

// =======================
// start the server ======
// =======================
app.listen(port, '0.0.0.0');
console.log('Magic happens at http://localhost:' + port);

module.exports = app;