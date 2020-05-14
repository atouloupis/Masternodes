var QRCode = require('qrcode')


function generateQrCode(pubKey,callback){
    QRCode.toDataURL(pubKey, function (err, url) {
    callback(url);
    })
}

module.exports.generateQrCode = generateQrCode;