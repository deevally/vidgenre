const config = require("config");


module.exports = function(){

    //config
if( !config.get('jwtPrivateKey')){
throw new Error("Fatal error: JwtPrivateKey not defined");
}
}


// export vidly_jwtPrivateKey=mySecureKey
// NODE_ENV=test node index.js  