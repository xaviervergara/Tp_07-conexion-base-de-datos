import mongoose from "mongoose";

const url =
  "mongodb+srv://xaviervergara00:passwd@cluster0.tzckbmu.mongodb.net/"; // String de conexión local
const dbName = "odm-test"; // Nombre de la base de datos

// Definición del esquema
const exampleSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      indexedDB: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Añade campos createdAt y updatedAt automáticamente
  },
);

// Creación del modelo (equivalente a una colección)
const ExampleModel = mongoose.model("documents", exampleSchema);

async function main() {
  // Conexión a MongoDB usando Mongoose
  await mongoose.connect(`${url}${dbName}`);
  console.log("Conexión exitosa a MongoDB con Mongoose");

  const insertResult = await ExampleModel.insertMany([
    { nombre: "Teclado", stock: 28 },
    { nombre: "Mouse", stock: 34 },
    { nombre: "Camara", stock: 22 },
  ]);

  console.log("Documentos insertados =>", insertResult);

  return "Completado.";
}

try {
  const result = await main();
  console.log(result);
} catch (error) {
  console.error("Error en la conexión o ejecución:", error);
} finally {
  // Cierre de conexión
  await mongoose.connection.close();
}
