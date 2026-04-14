import express from 'express';
const app = express();
const port = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('<h1>ELITE DIRECTORIO: OPERATIVO ✅</h1>');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Servidor en puerto ${port}`);
});
