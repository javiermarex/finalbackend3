import { connect } from "mongoose";

const dbConnect = async (url) => {
  try {
    await connect(url);
    console.log("Conectado a la base de datos de Mongoose");
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnect;
