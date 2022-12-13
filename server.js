const express = require("express")
const multer = require("multer")
const cors = require("cors")
const sql = require("mssql");

const app = express();
app.use(cors())

app.use(express.static('public')) //For showing the static page on localhost:3000
// app.use(express.urlencoded({
//     extended: true
// }))   //For Barsing url encoded type
app.use(express.text())   //For parsing text
// app.use(express.json());   //For parsing Json data

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

const sqlConfig = {
    server: '10.0.2.19',
    user: 'sa',
    password: 'Soulsvciot01',
    database: 'Inventory',
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
}

sql.connect(sqlConfig, (err) => {
    if (err) throw err
    else {
        console.log('Connected to DB');
    }
})

// app.get("/" , (req , res) => {
//     res.sendFile(__dirname + "/index.html")
// })

app.post('/purchase-order' , upload.single("PO_File") , (req , res) => {
    console.log(req.body)
    const po_num = req.body.po_num.toUpperCase();
    let query_check = `SELECT * FROM Orders WHERE PurchaseOrderNumber = '${po_num}'`
    let query = `INSERT INTO Orders (PurchaseOrderNumber , ItemName , VendorName , VendorAddress , GSTNnumber , TypeOfOrder , Quantity , Price , DateOfIssue , DueDate) values ('${po_num}' , '${req.body.item}', '${req.body.vendor_name}', '${req.body.vendor_addr}' , '${req.body.gstn.toUpperCase()}' ,'${req.body.type}', '${req.body.qty}' , '${req.body.price}' , '${req.body.issue_date}' , '${req.body.due_date}')`;
    
    let query_res = sql.query(query_check , (err , result_check) => {
        if(err){
            console.log(`err at query check line 54 --${err}`)
        } else {
            if(result_check.recordset.length > 0){
                console.log("Purchase Order Exist")
                res.send(JSON.stringify("Purchase Order Exists"))
            } else {
                let query_insert = sql.query(query , (err1 , result) => {
                    if(err1){
                        console.log(`err at query check line 61 --${err1}`)
                    } else {
                        console.log("pUrchase Order Submitted")
                        res.send(JSON.stringify("Purchase Order Submitted"))
                    }
                })
            }
        }
    })
    
    
})

app.get('/quote-count', (req, res) => {
    
    let query = `SELECT COUNT(*) FROM Orders WHERE TypeOfOrder = 'quote'`
    let query_res = sql.query(query , (err , result) => {
        if(err){
            throw err
        } else {
            const value = Object.values(result.recordset[0])
            // console.log(value[0])
            res.send(JSON.stringify(value[0]))
        }
    })
})

app.get('/online-count', (req, res) => {

    let query = `SELECT COUNT(*) FROM Orders WHERE TypeOfOrder = 'online'`
    let query_res = sql.query(query, (err, result) => {
        if (err) {
            throw err
        } else {
            const value = Object.values(result.recordset[0])
            // console.log(value[0])
            res.send(JSON.stringify(value[0]))
        }
    })
})

app.get('/local-count', (req, res) => {

    let query = `SELECT COUNT(*) FROM Orders WHERE TypeOfOrder = 'local'`
    let query_res = sql.query(query, (err, result) => {
        if (err) {
            throw err
        } else {
            const value = Object.values(result.recordset[0])
            // console.log(value[0])
            res.send(JSON.stringify(value[0]))
        }
    })
})

app.get('/intl-count', (req, res) => {

    let query = `SELECT COUNT(*) FROM Orders WHERE TypeOfOrder = 'Intl'`
    let query_res = sql.query(query, (err, result) => {
        if (err) {
            throw err
        } else {
            const value = Object.values(result.recordset[0])
            // console.log(value[0])
            res.send(JSON.stringify(value[0]))
        }
    })
})


app.get('/table-info' , (req ,res) => {
    let query = `SELECT * FROM ORDERS`
    let query_res = sql.query(query , (err , result) => {
        if(err){
            throw err
        } else {
            const values = Object.values(result.recordset)
            // console.log(JSON.stringify(values))
            // console.log(values)
            res.send(JSON.stringify(values))
        }
    })
})

app.post('/delete-row' , (req ,res) => {
    const po_num = req.body
    // console.log(po_num)
    let query = `DELETE FROM Orders WHERE PurchaseOrderNumber = '${po_num}'`
    let query_res = sql.query(query , (err , result) => {
        if(err){
            throw err
        } else {
            res.send(JSON.stringify('Deleted'))
        }
    })
})

app.post('/search' , (req , res) => {
    console.log(req.body)
    res.send(JSON.stringify(200))
})
// app.post('/test' , (req , res) => {
//     
// })
const port = 3000;
app.listen(port, () => {
    console.log(`Server Running at ${port}`)
})