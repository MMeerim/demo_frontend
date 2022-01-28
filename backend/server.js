const express = require('express');
const shell = require('shelljs')

const fileUpdate = require('./fileUpdate');
const readFolder = require('./readFolder')
const sendFile = require('./sendFile')

const app = express();
app.use(express.json());

const cors=require("cors");
const corsOptions ={
   origin:'*',             // Replace * with  website LINK
   credentials:true,       
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) 


app.get('/files', (req, res) => {
    files = readFolder.readFolder()
    res.json({'linux': files.linux, "windows": files.windows})
})

app.post('/file', (req, res) => {
    content = sendFile.sendFile(req.body.name, req.body.dir)
    res.json({'data': content})

})

app.post('/', (req, res) =>{
    fileUpdate.fileUpdate(req.body);
    console.log('file', req.body.fileName, 'updated')
    res.status(200)
    shell.exec('/root/terraform-linux/auto-apply.sh')
});

app.listen(3000, ()=> {
    console.log(`app is working`)
})

