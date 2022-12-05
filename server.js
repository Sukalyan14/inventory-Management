const express = require("express")
const multer = require("multer")
const cors = require("cors")
const sql = require("mssql")

const app = express();
app.use(cors())

app.use(express.static('public'))

const fileStorageEngine = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null , './uploads')
    },
    filename: (req , file , cb) => {
        cb(null , file.originalname + "---" + Date.now())
    }
})

const upload = multer({ storage : fileStorageEngine })

app.use(cors())

// app.get("/" , (req , res) => {
//     res.sendFile(__dirname + "/index.html")
// })

app.post('/purchase-order' , upload.single("P-O") , (req , res) => {
    console.log(req.body)
    console.log(req.file)
    res.send(JSON.stringify("Purchase Order Submitted"))
})

app.get('/quote-count', (req, res) => {
    console.log(req.body)
})


app.get('/table-info' , (req ,res) => {
    
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server Running at ${port}`)
})