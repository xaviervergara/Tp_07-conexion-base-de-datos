import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/"; // String de conexión local (sin autenticación)
const client = new MongoClient(url);
const dbName = "laboratorio"; // Nombre de la base de datos

async function main() {
  await client.connect();
  console.log("Conexión exitosa al servidor MongoDB");
  const db = client.db(dbName); // Con el mismo cliente podría acceder a múltiples bases de datos pasando otros valores a este método
  const collection = db.collection("sensores");

  const insertResult = await collection.insertMany([
    {
      nombre: "Sensor de Humedad",
      tipo: "sensor",
      activo: true,
    },
    {
      nombre: "Servo Motor",
      tipo: "actuador",
      activo: true,
    },
    {
      nombre: "LED RGB",
      tipo: "indicador",
      activo: true,
    },
  ]);
  console.log("Documentos insertados =>", insertResult);

  return "Completado.";
}

try {
  const result = await main();
  console.log(result);
} catch (error) {
  console.error("Error en la conexión con MongoDB:", error);
} finally {
  await client.close();
}
