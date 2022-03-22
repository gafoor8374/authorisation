const mongoose = require('mongoose');

module.exports = ()=>{
    return mongoose.connect(
'mongodb+srv://gafoor:gafoor8374@cluster0.v8wsr.mongodb.net/authetiction?retryWrites=true&w=majority'

        // "mongodb+srv://gafoor:gafoor8374@cluster0.v8wsr.mongodb.net/assignment-authetication?retryWrites=true&w=majority" 
        // "mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/web15-fileuploads?retryWrites=true&w=majority"
        )
}