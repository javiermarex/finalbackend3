import { faker } from "@faker-js/faker";
faker.locale = "es";

const createMockProduct = () => {
  const categorias = [
    "Martillo",
    "Destornillador",
    "Pala",
    "Cables",
    "Caños",
    "Herramientas Eléctricas",
    "Taladros",
    "Pinzas",
    "Sierras",
    "Pegamento",
  ];
  const titulo = faker.commerce.productName();
  const descripcion = faker.commerce.productDescription();
  const categoria = categorias[faker.number.int({ min: 0, max: 15 })];
  const imagen = faker.image.urlLoremFlickr({
    category: "nature",
    width: 360,
    height: 360,
  });
  const precio = Number.parseInt(faker.commerce.price({ min: 10, max: 2000 }));
  const stock = faker.number.int({ min: 1, max: 1000 });
  return { titulo, descripcion, categoria, imagen, precio, stock };
};

//console.log(createMockProduct());
export default createMockProduct;
