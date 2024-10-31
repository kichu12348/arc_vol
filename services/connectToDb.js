const mongoose = require('mongoose');

async function connectToDb() {
    const uri =process.env.MONGO_URI;
    await mongoose.connect(uri)
    .then(()=>{
        console.log('Connected to the database 🚀');
    })
    .catch(err => {
        console.log("demn you messed up 😬 ",err.message)
    });
}

module.exports = connectToDb;