import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
    {
        titulo: { type: String, required: true, index: true },
        descripcion: { type: String , default: "Descripción del producto"},
        categoria: { type: String, default: "Herramientas Eléctricas", enum: ["Martillo", "Destornillador", "Pala", "Cables", "Caños", "Herramientas Eléctricas", "Taladros", "Pinzas", "Sierras", "Pegamento"], },
        imagen: { type: String, default: "https://www.ubuy.com.ar/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTEzSlVVSEJETUwuX1NTNDAwXy5qcGc.jpg", },
        precio: { type: Number, default: 10 },
        stock: { type: Number, default: 10 },
        disponible: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Product = model(collection, schema);
export default Product;
