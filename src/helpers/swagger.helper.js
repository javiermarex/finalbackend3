import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../../utils.js";

const opts = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "ECCOMERCE JAVIER JACOBO.",
            description: "Documentación del proyecto."
        }
    },
    apis: [__dirname+"/src/docs/*.yaml"]
}
const swaggerSpecs = swaggerJSDoc(opts)

export default swaggerSpecs;