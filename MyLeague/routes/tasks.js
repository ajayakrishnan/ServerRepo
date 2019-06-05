var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient;
const url = 'mongodb+srv://ajayakrishnan:test1234@cluster0-kix96.mongodb.net/test?retryWrites=true&w=majority';

router.get('/teams', function (req, res, next) {
    mongo.connect(url, (err, client) => {
        if (err) {
            console.error(err);
            return;
        }
        const db = client.db('MyLeagueDB')
        const collection = db.collection('myleague_teams')
        collection.find().toArray((err, items) => {
            console.log(items)
            res.send(items);
        })
    })
});

router.post('/task', function(res, req, next){
    var task = req.body;
    if(!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            'error' : 'bad data'
        });
    }
    else{
        db.task.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;