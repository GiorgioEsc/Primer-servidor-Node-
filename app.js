const express = require('express')

const app = express()
const multer  = require('multer')
const sharp = require('sharp')
const fs = require('fs')

const storageStrategy = multer.memoryStorage()
const upload = multer({storage: storageStrategy })

app.use(express.json())


app.get('/', function(req, res){
    res.send('Hola Mundo!')
})

app.post('/imagen',upload.single('imagen'), async function (req, res){
    const body= req.body
    const imagen= req.file

    const processedImage = sharp(imagen.buffer).resize(200, 10,{
        fit: "contain",
        background: "#fff"
    })
    const resizedImageBuffer = await processedImage.toBuffer()
    
    fs.writeFileSync('uploads/prueba.png',resizedImageBuffer)

    console.log(resizedImageBuffer)
    res.send({resizedImageBuffer})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log("Servidor escuchando en el puerto", PORT)
})

