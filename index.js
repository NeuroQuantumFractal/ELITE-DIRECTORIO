const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

console.log("🚀 Infraestructura de Élite Iniciada en Obregón...");
console.log("🔥 Datos cargados");

app.get('/', (req, res) => {
  res.send('<h1>Directorio Elite Obregón: OPERATIVO ✅</h1>');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Servidor lanzado con precisión láser en puerto ${port}`);
});
