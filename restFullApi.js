module.exports.getRestFull=getRestFull;
module.exports.postRestFull=postRestFull;
var https = require('https');


function getRestFull(options,callback) {

    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        var buffer = '';
        res.on('data', function (data) {
            buffer += data;
        });

        res.on('end', function () {
            try {
                var json = JSON.parse(buffer);
            } catch (err) {
                return callback(err);
            }
            callback(false, json);
        });
    });

    req.on('error', function (err) {
        callback(err);
    });

    req.on('socket', function (socket) {
        socket.setTimeout(10000);
        socket.on('timeout', function() {
            req.abort();
        });
    });
	
    req.end();
}

function postRestFull(options, data, callback) {
	var data = JSON.stringify(data);

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
var buffer = '';
  res.on('data', d => {
    buffer += d;
  })
          res.on('end', function () {
            try {
                var json = JSON.parse(buffer);
            } catch (err) {
                return callback(err);
            }
            callback(false, json);
        })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end( )
}

