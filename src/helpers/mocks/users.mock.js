import { faker } from "@faker-js/faker";
faker.locale = 'es';

const createMockUser = () => {
  const rol = ["USER", "ADMIN", "PREM"];
  const nombre = faker.internet.username().toLowerCase();
  const cumple = faker.date.birthdate();
  const city = faker.location.city();
  const email = nombre + "@prueba.com.ar";
  const pass = "hola1234";
  const avatar = faker.image.urlLoremFlickr({
    category: "nature",
    width: 360,
    height: 360,
  });
  const roles = rol[faker.number.int({ min: 0, max: 2 })];
  return { nombre, cumple, city, email, pass, avatar, roles };
};

//console.log(createMockUser());
export default createMockUser;