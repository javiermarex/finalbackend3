import CustomRouter from "../../helpers/customRouter.helper.js";
import { productsController } from "../../controllers/controller.js";

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/",["PUBLIC"], productsController.createOne);
    this.read("/",["PUBLIC"], productsController.readAll);
    this.read("/:id",["PUBLIC"], productsController.readById);
    this.update("/:id",["ADMIN"], productsController.updateById);
    this.destroy("/:id",["ADMIN"], productsController.destroyById);
  };
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();

//Viejo

// import { Router } from "express";
// import { productsController } from "../../controllers/controller.js";

// const productsRouter = Router();

// productsRouter.post("/", productsController.createOne);
// productsRouter.get("/", productsController.readAll);
// productsRouter.get("/:id", productsController.readById);
// productsRouter.put("/:id", productsController.updateById);
// productsRouter.delete("/", productsController.readAll);

// export default productsRouter;
