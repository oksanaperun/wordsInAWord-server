var restify = require('restify'),
  mongojs = require('mongojs'),
  db = mongojs(process.env.MongoConnectionString, ['wordsinaword']),
  server = restify.createServer();
 
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(3000, function () {
    console.log('Server started @ 3000');
});

server.get('/wordsinaword', function (req, res, next) {
    db.wordsinaword.find(function (err, totalCounts) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(totalCounts));
    });
    return next();
});

server.post('/wordsinaword', function (req, res, next) {
    var requestData = req.params;

    db.wordsinaword.save(requestData,
        function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    return next();
});