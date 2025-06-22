//import "dotenv/config.js";
import "./src/helpers/env.js";
import express from "express";
import compression from "express-compression";
import {serve, setup } from "swagger-ui-express"
import swaggerSpecs from "./src/helpers/swagger.helper.js";
import dbConnect from "./src/helpers/db_Connect.helper.js";
import indexRouter from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import argvs from "./src/helpers/arguments.helper.js";

/*Configuración del servidor*/
const server = express();
const port = process.env.PORT || 9000;
const ready = async () => {
  console.log(
    "Servidor conectado en el puerto " + port + " en modo " + argvs.mode
  );
  await dbConnect(process.env.LINK_DB);
};

server.listen(port, ready);

/*Configuración de middlewares*/

server.use(compression({ brotli: { enable: true, zlib: {} } }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use("/api/docs", serve, setup (swaggerSpecs));
/*Configuración del router*/

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
