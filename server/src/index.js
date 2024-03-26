const express = require("express")
const mysql = require("promise-mysql")
const cors = require("cors")
const morgan = require("morgan")
const multer = require("multer");

const app = express()

app.use( express.static("upload"));
//miderwars
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

const routerCarta = require("./router/carta.router")

app.use("/api",routerCarta)

app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001");
})