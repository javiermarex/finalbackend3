import "dotenv/config.js";
import { expect } from "chai";
import dbConnect from "../../src/helpers/db_Connect.helper.js";
import { productsManager } from "../../src/dao/managers/mongo.manager.js";

describe("TEST: Servicio de productos", () => {
    before(async () => await dbConnect(process.env.LINK_DB));

    it("POST /api/products no debe crear un producto cuando no me pasan los datos bien", async () => {
        try {
            await productsManager.createOne({});
        } catch (error) {
            expect(error.message).to.exist;
        }
    });

    it("Se leen todos los productos de la base de datos", async () => {
        const response = await productsManager.readAll();
        expect(response).to.be.an("array");
        expect(response.length).to.be.greaterThan(0);
    });

    it("No se deben leer productos cuando el filtro no se cumple", async () => {
        const response = await productsManager.readAll({ titulo: "Pablito clavo un clavito" });
        expect(response).to.be.an("array").that.is.empty;
    });

    it("Debe leer productos por categoría", async () => {
        await productsManager.createOne({ titulo: "Producto filtro", categoria: "Martillo" });
        const response = await productsManager.readAll({ categoria: "Martillo" });
        expect(response).to.be.an("array").that.is.not.empty;
        response.forEach(producto => {
            expect(producto.categoria).to.equal("Martillo");
        });
    });

    it("Debe crear múltiples productos (5 productos)", async () => {
        const productos = [];
        for (let i = 0; i < 5; i++) {
            const prod = await productsManager.createOne({ titulo: `Producto ${i}` });
            productos.push(prod);
        }
        expect(productos.length).to.equal(5);
    });

    it("Se debe leer un producto por ID", async () => {
        const creado = await productsManager.createOne({ titulo: "Producto test por ID" });
        const response = await productsManager.readById(creado._id);
        expect(response).to.exist;
        expect(response._id.toString()).to.equal(creado._id.toString());
    });
    it("NO debe crear un producto con precio negativo", async () => {
        try {
            await productsManager.createOne({ titulo: "Producto invalido", precio: -100 });
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.include("validation failed");
        }
    });
});