const express = require("express");
const database = require("../models/db");
const routerCarta = express.Router();
const multer = require("multer");
const fs = require("fs");
routerCarta.get("/menu", async (req, res) => {
  try {
    const conection = await database.getConnection();
    const result = await conection.query("SELECT * FROM menu; ");
    res.status(200).json(result);
  } catch (error) {
    console.log(`error en la consulta`, error);
    await conection.end();
    res.status(500).json({ error: error });
  }
});
const upload = multer({
  dest: "upload/",
});
routerCarta.post("/menu", upload.single("imageUpLoading"), async (req, res) => {
  const conection = await database.getConnection();
  const origianlNameee = saveiamgeFuncion(req.file);
  const url_imagen = `http://localhost:3001/${origianlNameee}`;
  let { title, price } = req.body;
  console.log(req.body);
console.log(req.body);
  try {
    await conection.query(
      `INSERT INTO menu (  title, price, url_imagen ) VALUES (?,?,?);`,
      [title, price, url_imagen]
    );
    res.status(200).json({ message: "salio bien" });
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
});
function saveiamgeFuncion(file) {
  console.log(`file ${file}`);
  const fechaActualEnMilisegundos = new Date().getTime();
  const newPath = `./upload/${file.originalname}-${fechaActualEnMilisegundos}`;
  fs.renameSync(file.path, newPath);
  console.log(file);
  let origianlNameee = file.originalname;
  console.log(origianlNameee);
  return origianlNameee;
}
routerCarta.put("/menu/:id", async (req, res) => {
  const conection = await database.getConnection();
  const id = req.params.id;
  let { title, price, url_imagen } = req.body;
  console.log(id);
  try {
    await conection.query(
      `UPDATE menu
      SET title = ?, price = ?,url_imagen = ?
      WHERE id = ?`,
      [title, price, url_imagen, id]
    );
    res.status(200).json({ message: "salio bien" });
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

routerCarta.delete("/menu/:id", async (req, res) => {
  const conection = await database.getConnection();
  const id = req.params.id;
  let { title, price, url_imagen } = req.body;
  console.log(id);
  try {
    await conection.query(
      `DELETE FROM menu
        WHERE id = ?;`,
      [id]
    );
    res.status(200).json({ message: "salio bien" });
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
});
module.exports = routerCarta;
