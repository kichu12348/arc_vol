const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const connectToDb = require('./services/connectToDb');
const userRouter = require('./routes/user');

connectToDb();

app.use(express.json());
app.use('/users', userRouter);


const port = process.env.PORT;

app.get('/', (req, res) => {
    const html = path.resolve(__dirname, 'client', 'index.html');
    res.sendFile(html);
});

app.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const file = path.resolve(__dirname,'client',filename);
    if(!fs.existsSync(file)){
       return res.status(404).send('File not found');
    }
    res.sendFile(file);
});






app.listen(port, () => {
    console.log(`Server is running on port ${port} 🙃`);
});