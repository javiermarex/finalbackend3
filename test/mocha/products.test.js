import "dotenv/config.js"
import assert from "assert";
import dbConnect from "../../src/helpers/db_Connect.helper.js";
import { productsManager } from "../../src/dao/managers/mongo.manager.js";

describe (
    "TeST: Servicio de productos",
    ()=> {
        before(async()=> await dbConnect(process.env.LINK_DB) )
        // it (
        //     "POST /api/products debe crear un producto",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(response._id)
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con titulo predeterminado",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(response.titulo)
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con titulo predeterminado y del tipo string",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(typeof response.titulo === "string")
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con descripcion predeterminada",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(response.descripcion)
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con descripcion predeterminada y del tipo string",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(typeof response.descripcion === "string")
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con categoria predeterminada",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(response.categoria)
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con categoria predeterminada y del tipo string",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(typeof response.categoria === "string")
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con imagen predeterminada",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(response.imagen)
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con imagen predeterminada y del tipo string",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(typeof response.imagen === "string")
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con precio predeterminado",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(response.precio)
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con precio predeterminado y de tipo numerico",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(typeof response.precio === "number")
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con stock predeterminado",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(response.stock)
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con stock predeterminado y de tipo numerico",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(typeof response.stock === "number")
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con disponibilidad predeterminada",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(response.disponible === false)
        //     }
        // )
        // it (
        //     "POST /api/products debe crear un producto con disponibilidad predeterminada y del tipo string",
        //     async()=> {
        //         const response = await productsManager.createOne ({titulo: "producto de prueba"})
        //         assert.ok(typeof response.disponible === "boolean")
        //     }
        // )
        it ("POST /api/products no debe crear un producto cuando no me pasan los datos bien", async () => {
            try{
                await productsManager.createOne({});
            } catch (error){
                assert.ok(error.message);
            }
        });
        it("Se leen todos los productos de la base de datos", async () => {
            const response = await productsManager.readAll();
            assert.ok(response.length > 0);
        });
        it("No se deben leen todos los productos de la base de datos cuando el filtro no se cumple", async () => {
            const response = await productsManager.readAll({titulo: "Pablito clavo un clavito"});
            assert.ok(response.length === 0);
        });
        it("Debe leer productos por categoría", async () => {
            await productsManager.createOne({ titulo: "Producto filtro", categoria: "Martillo" });
            const response = await productsManager.readAll({ categoria: "Martillo" });
            assert.ok(response.length > 0);
            response.forEach(producto => {
                assert.strictEqual(producto.categoria, "Martillo");
            });
        });
        it("Debe crear múltiples productos (6 productos)", async () => {
            const productos = [];
            for (let i = 0; i < 5; i++) {
                const prod = await productsManager.createOne({ titulo: `Producto ${i}` });
                productos.push(prod);
            }
            assert.ok(productos.length === 5);
        });
        it("Se debe leer un producto por ID", async () => {
            const creado = await productsManager.createOne({ titulo: "Producto test por ID" });
            const response = await productsManager.readById(creado._id);
            assert.ok(response);
            assert.strictEqual(response._id.toString(), creado._id.toString());
        });
    });

