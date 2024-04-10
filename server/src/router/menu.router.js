const express = require("express");
const database = require("../models/db");
const routerMenu = express.Router();
const multer = require("multer");
const fs = require("fs");

routerMenu.get("/extra/:itemid", async (req, res) => {
  const conection = await database.getConnection();
  const id = req.params.itemid;
  console.log(id);
  try {
    data = await conection.query(
      `SELECT * FROM extraproducto
        WHERE usuario = ?;`,
      [id]
    );
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
});
routerMenu.put("/extra/:id", async (req, res) => {
  const conection = await database.getConnection();
  const id = req.params.id;
  let { title, price } = req.body;
  try {
    await conection.query(
      `UPDATE extraproductok
            SET title = ?, price = ?
            WHERE id = ?`,
      [title, price, id]
    );
    res.status(200).json({ message: "salio bien" });
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
});
module.exports = routerMenu;
