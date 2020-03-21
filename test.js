var scaleway = require('./scaleway/scalewayApi');


scaleway.getServerInfos('',function(response){
console.log(response);
});
